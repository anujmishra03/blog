import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>();

// Middleware: Check JWT token
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.split(" ")[1];

  if (!token) {
    c.status(401);
    return c.json({ msg: "Unauthorized - No token provided" });
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("userId", user.id as string);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ msg: "Invalid or expired token" });
  }
});

// Helper to create Prisma client
function createPrisma(c: any) {
  return new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
}

// POST /api/v1/blog - Create Blog
blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = createPrisma(c);

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
    }
  });

  return c.json({ id: blog.id });
});

// PUT /api/v1/blog - Update Blog
blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const prisma = createPrisma(c);

  const blog = await prisma.blog.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,
    }
  });

  return c.json({ id: blog.id });
});


// GET /api/v1/blog/bulk - Get All Blogs
blogRouter.get('/bulk', async (c) => {
    const prisma = createPrisma(c);
  
    const blogs = await prisma.blog.findMany();
    return c.json({ blogs });
  });
  

// GET /api/v1/blog - Get Single Blog
blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = createPrisma(c);

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id) 
      },
      select:{
        title: true,
        content: true,
        author:{
          select:{
            name:true
          }
        }        
      }
    });
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({ msg: "Error while fetching blog post" });
  }
});

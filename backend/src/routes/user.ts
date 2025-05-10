import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';
import { z } from "zod";

// Zod schema for input validation
const signupInput = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  name: z.string().min(1)
});

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

function createPrisma(c: any) {
  return new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
}

// POST /api/v1/user/signup
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const parsed = signupInput.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ msg: "Invalid input", errors: parsed.error.errors });
  }

  const prisma = createPrisma(c);

  try {
    const existingUser = await prisma.user.findFirst({
      where: { Username: body.username }
    });

    if (existingUser) {
      c.status(409);
      return c.json({ msg: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        Username: body.username,
        password: hashedPassword,
        name: body.name
      }
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: 'Signed up!', token: jwt });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.text('Internal server error during signup');
  }
});

// POST /api/v1/user/signin
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const prisma = createPrisma(c);

  try {
    const user = await prisma.user.findFirst({
      where: {
        Username: body.username,
      }
    });

    if (!user) {
      c.status(401);
      return c.json({ msg: "Incorrect credentials" });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      c.status(401);
      return c.json({ msg: "Incorrect credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: 'Signin successful!', token: jwt });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.text('Internal server error during sign-in');
  }
});

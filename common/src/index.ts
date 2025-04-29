import z from "zod";


const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
})

const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6)
   
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})
export type SigninInput = z.infer<typeof signupInput>
export type SignupInput = z.infer<typeof signupInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>
export type createBlogInput = z.infer<typeof createBlogInput>


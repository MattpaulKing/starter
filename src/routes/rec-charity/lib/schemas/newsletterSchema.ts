import { z } from "zod"

export const newsletterSchema = z.object({
  firstName: z.string().min(1, { message: "Please eneter a first name" }),
  lastName: z.string().min(1, { message: "Please enter a last name" }),
  email: z.string().email({ message: "Please enter a valid email" })
})
export type NewsletterSchema = typeof newsletterSchema

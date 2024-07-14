import { object, pipe, email, string, optional } from 'valibot'

export const loginSchema = object({
  email: pipe(
    string(),
    email(),
  ),
  password: string(),
  next: optional(string(), "/")
})

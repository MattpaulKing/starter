import { object, trim, pipe, email, string } from 'valibot'

export const registerSchema = object({
  firstName: pipe(
    string(),
    trim()
  ),
  lastName: pipe(
    string(),
    trim()
  ),
  email: pipe(
    string(),
    email()
  ),
  password: string(),
  confirmPassword: string(),
})

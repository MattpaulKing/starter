import { object, string } from "valibot";

export const postSchema = object({
  id: string(),
  label: string(),
  content: string()
})
export type PostSchema = typeof postSchema

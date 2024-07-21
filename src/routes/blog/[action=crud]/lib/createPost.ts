import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { postSchema } from "$routes/blog/lib/postSchema";
import { formDbError, formInvalid, formSuccess } from "$lib/forms/formMessages";
import type { RequestEvent } from "../$types";

export default async function({ request, locals: { db } }: RequestEvent) {
  let form = await superValidate(request, valibot(postSchema))
  if (!form.valid) {
    return formInvalid(form)
  }
  const { error: err } = await db
    .from("posts")
    .insert({
      ...form.data,
      id: crypto.randomUUID()
    })
  if (err) {
    return formDbError(form, err)
  }
  return formSuccess(form)
}

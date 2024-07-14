import { formInvalid } from "$lib/forms/formMessages"
import { superValidate } from "sveltekit-superforms"
import { valibot } from "sveltekit-superforms/adapters"
import { registerSchema } from "$routes/auth/lib/schemas/registerSchema"
import type { RequestEvent } from "../$types"

export default async function({ request, locals: { db } }: RequestEvent) {
  const form = await superValidate(request, valibot(registerSchema))
  if (!form.valid) {
    return formInvalid(form)
  }
  let { error: err } = await db
}

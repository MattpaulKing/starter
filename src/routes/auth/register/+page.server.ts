import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { registerSchema } from "../lib/schemas/registerSchema";
import { formDbError, formInvalid, formSuccess } from "$lib/forms/formMessages";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions = {
  register: async ({ request, locals: { db } }) => {
    const form = await superValidate(request, valibot(registerSchema))
    if (!form.valid) {
      return formInvalid(form)
    }
    let { error: err } = await db
      .auth
      .signUp({
        email: form.data.email,
        password: form.data.password
      })
    if (err) {
      return formDbError(form, err)
    }
    return formSuccess(form)
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    registerForm: await superValidate(valibot(registerSchema))
  }
}

import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { newsletterSchema } from "./lib/schemas/newsletterSchema";
import type { Actions, PageServerLoad } from "./$types";
import { formInvalid, formSuccess } from "$lib/forms/formMessages";

export const actions = {
  newsletterSignUp: async ({ request }) => {
    const form = await superValidate(request, zod(newsletterSchema))
    if (!form.valid) {
      return formInvalid(form)
    }
    return formSuccess(form)
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    newsletterForm: await superValidate(zod(newsletterSchema))
  }
}

import { error, redirect, type Actions } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms"
import { valibot } from "sveltekit-superforms/adapters"
import { loginSchema } from "../lib/schemas/loginSchema"
import type { PageServerLoad } from "./$types"
import { formDbError } from "$lib/forms/formMessages"

export const actions = {
  signin: async ({ request, locals: { db } }) => {
    const form = await superValidate(request, valibot(loginSchema))
    if (!form.valid) {
      return formDbError(form, { message: "Invalid credentials" })
    }
    const { data, error: err } = await db.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
    })
    if (err || !data.user) {
      error(404, "That user wasn't found")
    }
    redirect(302, "/")
  }
} satisfies Actions

export const load: PageServerLoad = async ({ url }) => {
  let next = url.searchParams.get("next")
  if (next?.endsWith("/auth")) {
    next = "/"
  }
  return {
    next,
    loginForm: await superValidate(valibot(loginSchema))
  }
}

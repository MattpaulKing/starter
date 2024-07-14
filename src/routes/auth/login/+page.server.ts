import { error, redirect, type Actions } from "@sveltejs/kit"
import { superValidate } from "sveltekit-superforms"
import { valibot } from "sveltekit-superforms/adapters"
import { loginSchema } from "../lib/schemas/loginSchema"
import type { PageServerLoad } from "./$types"

export const actions = {
  signin: async ({ request, locals: { db } }) => {
    const form = Object.fromEntries(await request.formData()) as { next: string, email: string, password: string }
    const { data, error: err } = await db.auth.signInWithPassword({
      email: form.email,
      password: form.password
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

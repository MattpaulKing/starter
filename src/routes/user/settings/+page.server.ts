import { fail, redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const actions = {
  lightmode: async ({ request, locals: { db, user } }) => {
    if (!user) redirect(303, "/auth/login")
    const formData = Object.fromEntries(await request.formData()) as unknown as { lightmode: boolean }
    const { error: err } = await db
      .from("user_settings")
      .update({ lightmode: formData.lightmode })
      .eq("userId", user.id)
    if (err) {
      return fail(500, { message: "Something went wrong, please try again" })
    }
    return { message: "Saved" }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ locals: { db, user } }) => {
  if (!user) redirect(303, "/auth/login")
  return {
    settings: await db
      .from("user_settings")
      .select("*")
      .eq("userId", user.id)
  }
}

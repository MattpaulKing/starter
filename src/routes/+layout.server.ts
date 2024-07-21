import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { user, db } }) => {
  return {
    user,
    userSettings: await db
      .from("user_settings")
      .select("*")
      .eq("userId", user?.id ?? '')
      .limit(1)
      .single()
      .then(({ data, error: err }) => data)
  }
}

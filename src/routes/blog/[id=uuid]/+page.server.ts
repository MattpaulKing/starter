import { unwrapQuery } from "$lib/db/helpers"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { db }, params: { id } }) => {
  return {
    post: await db
      .from("posts")
      .select("*")
      .eq("id", id)
      .then(unwrapQuery)
  }
}

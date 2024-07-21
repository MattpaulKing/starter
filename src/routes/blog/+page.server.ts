import { unwrapQuery } from "$lib/db/helpers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    posts: await db
      .from("posts")
      .select("*")
      .then(unwrapQuery)
  }
}

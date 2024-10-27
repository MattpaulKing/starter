import { unwrapQueryAndCount } from "$lib/db/helpers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  const today = new Date()
  return {
    waves: await db
      .from("waves")
      .select("*", { count: "estimated" })
      .gte("waveTs", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getDate()).toISOString())
      .order("waveTs", { ascending: true })
      .then(unwrapQueryAndCount)
  }
}

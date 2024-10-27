import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { unwrapQueryAndCount } from "$lib/db/helpers";

export const GET: RequestHandler = async ({ locals: { db } }) => {
  const today = new Date()
  let { data: rows, count } = await db
    .from("waves")
    .select("*", { count: "estimated" })
    .gte("waveTs", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getDate()).toISOString())
    .order("waveTs", { ascending: true })
    .then(unwrapQueryAndCount)
  return json({ rows, count })
}

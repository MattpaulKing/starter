import type { TableData } from "$lib/components/DataTable";
import type { Tables } from "$lib/db/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, locals: { db } }) => {
  const apiRoute = "/waves/api"
  return {
    apiRoute,
    waves: await fetch(apiRoute).then(async r => await r.json() as TableData<Tables<"waves">>)
  }
}

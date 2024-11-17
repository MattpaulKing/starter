import { rowsToRanges } from "$lib/components/DataTable";
import { unwrapQueryAndCount } from "$lib/db/helpers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  const today = new Date()
  return {
    waves: await db
      .from("waves")
      .select("waveTs, waveHeight", { count: "estimated" })
      // .gt("waveTs", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getDate() - 1).toISOString())
      .order("waveTs", { ascending: true })
      .then(unwrapQueryAndCount)
      .then(({ count, data }) => ({
        count,
        rows: data.map((row) => ({
          ...row,
          waveTs: new Date(row.waveTs)
        }))
      })).then(({ count, rows }) => ({
        count,
        rows,
        filters: {
          "waveTs": rowsToRanges.dateRange(rows, "waveTs"),
          "waveHeight": rowsToRanges.numberRange(rows, "waveHeight"),
        }
      }))
  }
}

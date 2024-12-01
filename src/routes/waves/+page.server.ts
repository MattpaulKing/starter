import { rowsToRanges } from "$lib/components/DataTable";
import { unwrapQuery, unwrapQueryAndCount } from "$lib/db/helpers";
import type { Tables } from "$lib/db/types";
import type { PageServerLoad } from "./$types";

function getWaveAggsByTimeRange({ waveRows, range }: { waveRows: Pick<Tables<"waves">, "waveTs" | "waveHeight" | "swellDirection" | "wavePeriod">[], range: { min: number, max: number } }) {
  return waveRows.filter(({ waveTs }) => {
    let hours = new Date(waveTs).getHours()
    return hours >= range.min && hours <= range.max
  }).reduce((agg, curr, _, { length: numObservations }) => {
    agg.waveHeight += curr.waveHeight / numObservations
    agg.wavePeriod += curr.wavePeriod / numObservations
    agg.swellDirection += curr.swellDirection / numObservations
    return agg
  }, { waveHeight: 0, wavePeriod: 0, swellDirection: 0 })
}

export const load: PageServerLoad = async ({ locals: { db } }) => {
  const today = new Date()
  return {
    wavesToday: await db
      .from("waves")
      .select("waveTs, waveHeight, swellHeight, swellDirection, wavePeriod")
      .eq("beach", "sombrio")
      .gte("waveTs", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getDate()).toISOString())
      .lt("waveTs", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getDate() + 1).toISOString())
      .order("swellHeight", { ascending: true })
      .then(unwrapQuery)
      .then(x => {
        console.dir(x, { depth: null })
        return x
      })
      .then(rows => ({
        beach: "sombrio",
        times: {
          early: getWaveAggsByTimeRange({ waveRows: rows, range: { min: 6, max: 9 } }),
          morning: getWaveAggsByTimeRange({ waveRows: rows, range: { min: 10, max: 12 } }),
          afternoon: getWaveAggsByTimeRange({ waveRows: rows, range: { min: 12, max: 15 } }),
        },
        waveHeight: {
          min: rows[0].waveHeight,
          max: rows[rows.length - 1].waveHeight,

        },
        swell: {
          min: rows[0].swellHeight,
          max: rows[rows.length - 1].swellHeight
        }
      })),
    waves: await db
      .from("waves")
      .select("waveTs, waveHeight", { count: "estimated" })
      .eq("beach", "sombrio")
      .gte("waveTs", new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getDate()).toISOString())
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

import { extent } from "d3-array";
import type { FilterDateRange, FilterNumberRange, FilterSelectRange } from "./TableStore.svelte";

export function dateRange<T extends Record<string, unknown>>(rows: T[], key: keyof T): FilterDateRange {
  let range = extent(rows, (d) => d[key] as Date | undefined)
  range = range[0] && range[1] ? range : [new Date(), new Date()]
  return {
    filter: 'date-range',
    values: range,
    strValues: [range[0].toISOString().slice(0, 10), range[1].toISOString().slice(0, 10)],
    range: range
  };
}

function numberRange<T extends Record<string, unknown>>(rows: T[], key: keyof T): FilterNumberRange {
  let range = extent(rows, (d) => d[key] as number | undefined)
  range = range[0] && range[1] ? range : [0, 0]
  return {
    filter: "number-range",
    values: range,
    range: range,
  }
}

function selectRange<T extends Record<string, unknown>>(rows: T[], key: keyof T): FilterSelectRange {
  let range = Array.from(new Set(rows.map((d) => d[key] as string)))
  return {
    filter: "select",
    values: range,
    range: range,
  }
}

export default { dateRange, numberRange, selectRange }

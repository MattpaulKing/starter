import type { PostgrestError } from "@supabase/supabase-js"
import { errorCodes } from "."
import { error } from "@sveltejs/kit"

export default function <T>(query: {
  data: T,
  count: number | null,
  error: null,
  errorCode?: string
} | {
  data: null,
  count: null,
  error: PostgrestError
}): { count: number, data: T, errorCode?: string } {
  if (query.error && query.error.code === errorCodes.lessRowsThanOffset) {
    console.log(query.error)
    return { count: 0, data: [] as T, errorCode: errorCodes.lessRowsThanOffset }
  }
  else if (query.error) {
    console.log(query.error)
    error(404, query.error)
  }
  return { count: query.count ?? 0, data: query.data }
}

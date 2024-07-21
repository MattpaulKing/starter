import type { PostgrestError } from "@supabase/supabase-js"
import { error } from "@sveltejs/kit"

export default function <T>(query: {
  data: T,
  error: null
} | {
  data: null,
  error: PostgrestError
}) {
  if (query.error) {
    console.log(query.error)
    error(404, "Something went wrong, please contact an admin if the error persists")
  }
  return query.data
}

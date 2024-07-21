import type { ParamMatcher } from "@sveltejs/kit"

export const match: ParamMatcher = (param) => {
  return param === "create" || param === "update" || param === "read" || param === "delete"
}

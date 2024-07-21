import type { User } from "@supabase/supabase-js"
import { getContext, setContext } from "svelte"

const userCtx = Symbol("USER_CTX")
export function setUser(user: User) {
  return setContext(userCtx, user)
}
export function getUser(): ReturnType<typeof setUser> {
  return getContext(userCtx)
}

import type { Database } from "$lib/db/types"
import type { Session, SupabaseClient, User } from "@supabase/supabase-js"

declare global {
  declare namespace App {
    interface Locals {
      db: SupabaseClient<Database, "public">
      getSession: () => Promise<{ session: Session | null, user: User | null }>
      getAuthUser: () => Promise<User | null>
      session: Session | null,
      user: User | null
    }
    interface Data {
      supabase: SupabaseClient<Database, "public">
    }
    interface Error {
      code?: string
      details?: string
      hint?: string
      message: string
    }
    // interface State {
    // }
  }
  type UUID = `${string}-${string}-${string}-${string}-${string}`
}

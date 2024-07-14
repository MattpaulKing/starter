import { PUBLIC_DB_KEY, PUBLIC_DB_URL } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = createServerClient(PUBLIC_DB_URL, PUBLIC_DB_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, { ...options, path: '/' })
      },
      remove: (key, options) => {
        event.cookies.delete(key, { ...options, path: '/' })
      },
    },
  })
  event.locals.getAuthUser = async () => {
    const { data: { user } } = await event.locals.db.auth.getUser()
    return user
  }
  event.locals.getSession = async () => {
    const { data: { session } } = await event.locals.db.auth.getSession()
    return session
  }
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}

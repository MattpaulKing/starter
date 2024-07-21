import { PUBLIC_DB_KEY, PUBLIC_DB_URL } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const dbHook: Handle = async ({ event, resolve }) => {
  event.locals.db = createServerClient(PUBLIC_DB_URL, PUBLIC_DB_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.db.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.db.auth.getUser()
    if (error) {
      return { session: null, user: null }
    }

    return { session, user }
  }
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === "x-supabase-api-version"
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.getSession()
  event.locals.session = session
  event.locals.user = user
  if (!event.locals.session && event.url.pathname.startsWith("/user") && !event.url.pathname.startsWith("/auth")) {
    redirect(303, "/auth/login")
  }
  return resolve(event)
}

export const handle: Handle = sequence(dbHook, authGuard)

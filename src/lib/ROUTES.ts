/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  "/": `/`,
  "/auth/login": `/auth/login`,
  "/auth/register": `/auth/register`,
  "/blog": `/blog`,
  "/blog/[action=crud]": (params: { action: (Parameters<typeof import('../params/crud.ts').match>[0]) }) => {
    return `/blog/${params.action}`
  },
  "/blog/[id=uuid]": (params: { id: (Parameters<typeof import('../params/uuid.ts').match>[0]) }) => {
    return `/blog/${params.id}`
  },
  "/rec-charity": `/rec-charity`,
  "/rec-charity/about": `/rec-charity/about`,
  "/rec-charity/courses/[id=int]": (params: { id: (Parameters<typeof import('../params/int.ts').match>[0]) }) => {
    return `/rec-charity/courses/${params.id}`
  },
  "/rec-charity/team": `/rec-charity/team`,
  "/restaurant": `/restaurant`,
  "/restaurant/about": `/restaurant/about`,
  "/restaurant/menu/[menuSection]": (params: { menuSection: (string | number) }) => {
    return `/restaurant/menu/${params.menuSection}`
  },
  "/restaurant/reservations": `/restaurant/reservations`,
  "/table": `/table`,
  "/todos": `/todos`,
  "/todos/[action=crud]": (params: { action: (Parameters<typeof import('../params/crud.ts').match>[0]) }) => {
    return `/todos/${params.action}`
  },
  "/waves": `/waves`
}

/**
 * SERVERS
 */
const SERVERS = {
  "GET /auth/callback": `/auth/callback`,
  "GET /waves/api": `/waves/api`
}

/**
 * ACTIONS
 */
const ACTIONS = {
  "signin /auth/login": `/auth/login?/signin`,
  "register /auth/register": `/auth/register?/register`,
  "default /blog/[action=crud]": (params: { action: (Parameters<typeof import('../params/crud.ts').match>[0]) }) => {
    return `/blog/${params.action}`
  },
  "newsletterSignUp /rec-charity": `/rec-charity?/newsletterSignUp`,
  "default /todos/[action=crud]": (params: { action: (Parameters<typeof import('../params/crud.ts').match>[0]) }) => {
    return `/todos/${params.action}`
  },
  "lightmode /user/settings": `/user/settings?/lightmode`
}

/**
 * LINKS
 */
const LINKS = {
  
}

type ParamValue = string | number | undefined

/**
 * Append search params to a string
 */
export const appendSp = (sp?: Record<string, ParamValue | ParamValue[]>, prefix: '?' | '&' = '?') => {
  if (sp === undefined) return ''

  const params = new URLSearchParams()
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v))
    }
  }

  for (const [name, val] of Object.entries(sp)) {
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v)
      }
    } else {
      append(name, val)
    }
  }

  const formatted = params.toString()
  if (formatted) {
    return `${prefix}${formatted}`
  }
  return ''
}

/**
 * get the current search params
 * 
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */ 
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search)
  const record: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    record[key] = value
  }
  return record
}

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS }
type AllTypes = typeof AllObjs

export type Routes = keyof AllTypes extends `${string}/${infer Route}` ? `/${Route}` : keyof AllTypes
export const routes = [
	...new Set(Object.keys(AllObjs).map((route) => /^\/.*|[^ ]?\/.*$/.exec(route)?.[0] ?? route)),
] as Routes[]

/**
 * To be used like this: 
 * ```ts
 * import { route } from './ROUTES'
 * 
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(key: T, ...params: FunctionParams<AllTypes[T]>): string
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if (AllObjs[key] as any instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string
    return element(...params)
  } else {
    return AllObjs[key] as string
  }
}

/**
* Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
*
* Full example:
* ```ts
* import type { KIT_ROUTES } from './ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* ```
*/
export type KIT_ROUTES = {
  PAGES: { '/': never, '/auth/login': never, '/auth/register': never, '/blog': never, '/blog/[action=crud]': 'action', '/blog/[id=uuid]': 'id', '/rec-charity': never, '/rec-charity/about': never, '/rec-charity/courses/[id=int]': 'id', '/rec-charity/team': never, '/restaurant': never, '/restaurant/about': never, '/restaurant/menu/[menuSection]': 'menuSection', '/restaurant/reservations': never, '/table': never, '/todos': never, '/todos/[action=crud]': 'action', '/waves': never }
  SERVERS: { 'GET /auth/callback': never, 'GET /waves/api': never }
  ACTIONS: { 'signin /auth/login': never, 'register /auth/register': never, 'default /blog/[action=crud]': 'action', 'newsletterSignUp /rec-charity': never, 'default /todos/[action=crud]': 'action', 'lightmode /user/settings': never }
  LINKS: Record<string, never>
  Params: { action: never, id: never, menuSection: never }
}

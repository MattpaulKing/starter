import { unwrapQuery } from "$lib/db/helpers";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    todos: await db
      .from("todos")
      .select("*")
      .order("deadline", { ascending: true })
      .neq("status", 'done')
      .then(unwrapQuery)
      .then(todos => {
        return {
          inProgress: todos.filter(({ status }) => status === 'in progress'),
          todo: todos.filter(({ status }) => status === 'todo')
        }
      }),
    completeTodos: db
      .from("todos")
      .select("*")
      .eq("status", 'done')
  }
}

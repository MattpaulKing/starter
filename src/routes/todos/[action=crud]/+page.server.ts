import { unwrapQuery } from "$lib/db/helpers";
import { error, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { todoSchema } from "./lib/todoSchema";
import type { PageServerLoad } from "../$types";

export const actions = {
  default: async (e) => {
    let { params: { action } } = e
    switch (action) {
      case "create":

    }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ url: { searchParams }, params: { action }, locals: { db } }) => {
  let formData
  let todoId = searchParams.get("todoId")
  if (action === "create") {
    formData = {}
  } else if (todoId) {
    formData = await db
      .from("todos")
      .select("*")
      .eq("id", todoId)
      .limit(1)
      .single()
      .then(unwrapQuery)
      .then(todo => ({
        ...todo,
        deadline: new Date(todo.deadline ?? 0)
      }))
  } else {
    error(404)
  }
  return {
    action,
    todoForm: await superValidate(formData, valibot(todoSchema))
  }
}

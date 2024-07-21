import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { postSchema } from "../lib/postSchema";
import { unwrapQuery } from "$lib/db/helpers";
import { error, type Actions } from "@sveltejs/kit";
import { createPost } from "./lib";
import type { PageServerLoad } from "./$types";
import type { RequestEvent } from "./$types";

export const actions = {
  default: async (e) => {
    let { params: { action } } = e
    switch (action) {
      case "create":
        return createPost(e as RequestEvent)
    }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ url: { searchParams }, params: { action }, locals: { db } }) => {
  let formData
  let postId = searchParams.get("postId")
  if (action === "create") {
    formData = {}
  } else if (postId) {
    formData = await db
      .from("posts")
      .select("*")
      .eq("id", postId)
      .limit(1)
      .single()
      .then(unwrapQuery)
  } else {
    error(404)
  }
  return {
    action,
    postForm: await superValidate(formData, valibot(postSchema))
  }
}

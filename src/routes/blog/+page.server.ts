import sanitizeHtml from "sanitize-html";
import { unwrapQuery } from "$lib/db/helpers";
import { sanitizerSettings } from "./lib/sanitizerSettings";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    posts: await db
      .from("posts")
      .select("*")
      .then(unwrapQuery)
      .then(posts => posts.map((post) => ({
        ...post,
        content: sanitizeHtml(post.content, sanitizerSettings)
      })))
  }
}

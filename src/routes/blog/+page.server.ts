import { unwrapQuery } from "$lib/db/helpers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    posts: [{
      id: '1',
      href: 'page1',
      label: 'Some really long title thats long',
      content: 'lorem ipsum'
    }]
    // posts: await db
    //   .from("posts")
    //   .select("*")
    //   .then(unwrapQuery)
  }
}

import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import { reservationSchema } from "../lib/schemas/reservationSchema"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { db } }) => {
  return {
    reservationForm: await superValidate({ guests: '2' }, zod(reservationSchema), { errors: false })
  }
}

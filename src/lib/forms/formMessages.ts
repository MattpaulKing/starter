import { message, type Infer, type SuperValidated } from "sveltekit-superforms"
import type { PostgrestError } from "@supabase/supabase-js";
import type { GenericSchema } from "valibot"

export function formInvalid<T extends SuperValidated<Infer<GenericSchema>>>(form: T) {
  console.log(form.errors)
  return message(form, { status: 400 })
}
export function formDbError<T extends SuperValidated<Infer<GenericSchema>>>(form: T, err: Partial<PostgrestError>) {
  console.log(err.message)
  return message(form, err.message, { status: 500 })
}
export function formSuccess<T extends SuperValidated<Infer<GenericSchema>>>(form: T, displayMsg: string | undefined = undefined) {
  return message(form, displayMsg ?? "Saved")
}

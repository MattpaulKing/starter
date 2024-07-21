import { valibotClient } from "sveltekit-superforms/adapters"
import { superForm, type FormOptions, type Infer, type SuperForm, type SuperValidated } from "sveltekit-superforms"
import type { GenericSchema } from "valibot"
import type { Toaster } from "$lib/components/Toaster/Toaster.svelte"

export function defaultFormOptions<T extends GenericSchema>(schema: T) {
  return {
    validators: valibotClient(schema),
    errorSelector: '[aria-invalid="true"],[data-invalid]',
    scrollToError: "smooth" as const,
    stickyNavbar: ".app-bar" as const,
    delayMs: 700,
    timeoutMs: 8000,
    resetForm: false,
  } as FormOptions<Infer<T>, any, Infer<T>>
}

// <T extends Record<string, unknown> = Record<string, unknown>
// M = App.Superforms.Message extends never ? any : App.Superforms.Message
// In extends Record<string, unknown>

export function setFormStores<T extends GenericSchema>({ form, schema, stores, opts = {} }:
  { form: SuperValidated<Infer<T>, any, Infer<T>>, schema: T, stores: { toast: Toaster }, opts: FormOptions<Infer<T>, any, Infer<T>> }
) {
  return superForm(form, {
    ...defaultFormOptions(schema),
    onResult({ result }) {
      if (result.type === "success") {
        stores.toast.add({ type: "save", message: "Saved" })
      } else if (result.type !== "redirect") {
        stores.toast.add({ type: "error", message: form.message ?? "Something went wrong" })
      }
    },
    ...opts
  })
}

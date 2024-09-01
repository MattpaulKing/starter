import { zod } from "sveltekit-superforms/adapters"
import { superForm, type FormOptions, type Infer, type SuperValidated } from "sveltekit-superforms"
import type { Toaster } from "$lib/components/Toaster/Toaster.svelte"
import type { AnyZodObject, ZodEffects } from "zod"


export function defaultFormOptions<T extends AnyZodObject | ZodEffects<AnyZodObject>>(validator: T) {
  return {
    validators: zod(validator),
    errorSelector: '[aria-invalid="true"],[data-invalid]',
    scrollToError: "smooth" as const,
    stickyNavbar: ".app-bar" as const,
    delayMs: 700,
    timeoutMs: 8000,
    resetForm: false,
  } as FormOptions<Infer<T>, any, Infer<T>>
}

export function setFormStores<T extends AnyZodObject | ZodEffects<AnyZodObject>>({ form, schema, stores, opts = {} }:
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

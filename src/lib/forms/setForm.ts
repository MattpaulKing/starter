import { valibotClient } from "sveltekit-superforms/adapters"
import { superForm, type FormOptions, type Infer, type SuperForm, type SuperValidated } from "sveltekit-superforms"
import type { GenericSchema } from "valibot"

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

export function setFormStores<T extends GenericSchema>({ form, schema }:
  { form: SuperValidated<Infer<T>, any, Infer<T>>, schema: T } & FormOptions<Infer<T>, any, Infer<T>>
) {
  return superForm(form, {
    ...defaultFormOptions(schema)
  })
}

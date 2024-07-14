import { getContext, setContext } from "svelte";
import { readable, writable, type Readable, type Writable } from "svelte/store";
import { arrayProxy, formFieldProxy, type FormFieldProxy, type FormPathArrays, type FormPathLeaves, type SuperForm } from "sveltekit-superforms";
import type { LookupOption } from "../types";

const FORM_CTX = Symbol("DISABLED")
export function setFormCtx(props: { disabled: boolean }) {
  return setContext(FORM_CTX, {
    disabled: writable(props.disabled)
  })
}
export function getFormCtx(): ReturnType<typeof setFormCtx> {
  return getContext(FORM_CTX)
}

const FIELD_CTX = "FIELD_CTX"
export function setArrayField<T extends Record<string, unknown>>({ form, path }: { form: SuperForm<T>, path: FormPathArrays<T> }) {
  let { errors, values: value } = arrayProxy(form, path);
  return setContext(FIELD_CTX, {
    errors,
    value,
    constraints: writable({}),
    tainted: writable(undefined),
    path,
    focused: writable(false),
    searching: writable(false),
    disabled: writable(false)
  })
}
export function setField<T extends Record<string, unknown>>({ form, path }: { form: SuperForm<T>, path: FormPathLeaves<T> }) {
  let { errors, constraints, tainted, value } = formFieldProxy(form, path)
  return setContext(FIELD_CTX, {
    errors,
    value,
    constraints,
    tainted,
    path,
    focused: writable(false),
    searching: writable(false),
    disabled: writable(false)
  })
}
type FormFieldMetadata = {
  selected: Writable<LookupOption[]>,
  focused: Writable<boolean>,
  searching: Writable<boolean>,
  disabled: Writable<boolean>
}
export function getField<T>() {
  return getContext(FIELD_CTX) satisfies FormFieldProxy<T> & FormFieldMetadata
}
const selectedCtx = Symbol("LOOKUPS")
export function setLookups({ lookups, selected }: { lookups: Writable<LookupOption[]>, selected: Readable<LookupOption[]> }) {
  return setContext(selectedCtx, { lookups, selected })
}
export function getLookups(): ReturnType<typeof setLookups> {
  return getContext(selectedCtx)
}
const INPUT_EL_CTX = Symbol("INPUT_EL_CTX")
export function setInputElCtx(inputEl: HTMLElement) {
  return setContext(INPUT_EL_CTX, readable(inputEl))
}
export function getInputElCtx(): ReturnType<typeof setInputElCtx> {
  return getContext(INPUT_EL_CTX)
}

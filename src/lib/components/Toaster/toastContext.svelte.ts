import { getContext, setContext } from "svelte"
import { Toaster } from "./Toaster.svelte"

const toastCtx = Symbol("TOAST_CTX")

export function setToaster() {
  return setContext(toastCtx, new Toaster)
}
export function getToaster(): Toaster {
  return getContext(toastCtx)
}

import { getContext, setContext } from "svelte";

const COL_KEY = "COL_KEY"
export function setColKey(keyVal: string) {
  return setContext(COL_KEY, keyVal)
}
export function getColKey() {
  return getContext<string>(COL_KEY)
}

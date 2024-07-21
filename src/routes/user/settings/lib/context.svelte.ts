import { setContext } from "svelte";
import type { Tables } from "$lib/db/types";

class UserSettings {
  general = $state({
    tableRows: 5,
    lightmode: false,
    reducedMotion: false,
    pushNotifications: false
  })
  constructor(props: Tables<"user_settings"> | null) {
    this.general = { ...this.general, ...props }
  }
}

const userSettingsCtx = Symbol("USER_SETTINGS_CTX")
export function setUserSettings(initial: Tables<"user_settings"> | null) {
  return setContext(userSettingsCtx, new UserSettings(initial))
}

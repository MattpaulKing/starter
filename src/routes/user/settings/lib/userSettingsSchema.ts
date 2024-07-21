import { object, pipe, number, string, integer, boolean } from 'valibot'

export const userSettingsSchema = object({
  userId: string(),
  tableRows: pipe(
    number(),
    integer(),
  ),
  lightmode: boolean(),
  reducedMotion: boolean(),
  pushNotifications: boolean()
})
export const userSettingsDefaults = {
  tableRows: 5,
  lightmode: false,
  reducedMotion: false,
  pushNotifications: false
}
export type UserSettingsSchema = typeof userSettingsSchema

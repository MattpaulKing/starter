import { z } from "zod"
export const reservationSchema = z.object({
  guests: z.string(),
  reservationDate: z.date(),
  room: z.string()
})
export type ReservationSchema = typeof reservationSchema

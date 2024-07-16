import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const registrationValidator = vine.compile(
  vine.object({
    firstName: vine.string().maxLength(255),
    lastName: vine.string().maxLength(255),
    email: vine.string().trim().email(),
    dateOfBirth: vine.date().transform((date) => {
      return DateTime.fromJSDate(date)
    }),
    username: vine.string().trim(),
    password: vine.string().minLength(8).confirmed({ confirmationField: "passwordConfirmation"})
  })
)
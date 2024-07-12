import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    firstName: vine.string().maxLength(255),
    lastName: vine.string().maxLength(255),
    email: vine.string().trim().email(),
    username: vine.string().trim(),
    password: vine.string().minLength(8).confirmed({ confirmationField: "passwordConfirmation"})
  })
)
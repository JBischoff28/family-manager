import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    email: vine.string().trim().email(),
    username: vine.string().trim(),
    password: vine.string().minLength(8).confirmed({ confirmationField: "passwordConfirmation"})
  })
)
import vine from '@vinejs/vine'

export const loginWithUsernameValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().trim()
  })
)

export const loginWithEmailValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim(),
    password: vine.string().trim()
  })
)
import vine from '@vinejs/vine'

export const sendTokenValidator = vine.compile(
    vine.object({
        email: vine.string().email()
    })
)

export const passwordResetValidator = vine.compile(
    vine.object({
        password: vine.string().minLength(8).confirmed({ confirmationField: "passwordConfirmation"}),
        token: vine.string()
    })
)
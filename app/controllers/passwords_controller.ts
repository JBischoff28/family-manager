import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { randomBytes } from 'crypto'
import mail from '@adonisjs/mail/services/main'

// Validator Imports
import { passwordResetValidator } from '#validators/password'

// Model Imports
import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'

export default class PasswordsController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  async forgotPassword({ request, inertia }: HttpContext) {
    try {
      const payload = await request.validateUsing(passwordResetValidator)
      const user = await User.findBy('email', payload.email)

      if (!user) {
        return inertia.render('auth/forgot-password', { errors: [{ message: "There is no user registered with this email address. Please try a different email address" }] })
      }

      const token: any = await new Promise((resolve, reject) => {
        randomBytes(24, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer.toString('hex'));
          }
        });
      });

      const expiresAt = DateTime.local().plus({ hours: 1 })

      if (!token.reason) {
        const resetToken = await PasswordResetToken.create({
          userId: user.id,
          token: token,
          expiresAt: expiresAt
        })
        
        if (resetToken) {
          console.log("Sending Email")
          await mail.send((message) => {
            message
              .to(user.email)
              .from('jbischoffdev@gmail.com')
              .subject('Reset Your Password - Family Manager')
              .htmlView('emails/reset-password', { user, resetToken })
          }).then(() => console.log('Email Sent'))
        }
      }
    } catch (error) {
      console.log(error)
      return inertia.render('auth/forgot-password', { errors: error.messages })
    }
  }

}
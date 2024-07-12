import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { randomBytes } from 'crypto'
import mail from '@adonisjs/mail/services/main'

// Validator Imports
import { passwordResetValidator, sendTokenValidator } from '#validators/password'

// Model Imports
import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'

export default class PasswordsController {

  /**
   * 
   * Renders the Forgot Password page
   */
  async showForgotPassword({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  /**
   * 
   * Finds a user by their email address.
   * Creates a PasswordResetToken and attaches the found user to the token.
   * Sends an email to the user with a link to reset their password. 
   */
  async sendResetToken({ request, inertia }: HttpContext) {
    try {
      const payload = await request.validateUsing(sendTokenValidator)
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
          return inertia.render('auth/token-sent')
        }
      }
    } catch (error) {
      return inertia.render('auth/forgot-password', { errors: error.messages })
    }
  }

  /**
   * 
   * Renders the Reset Password page if a reset token is present. 
   */
  async showResetPassword({ request, inertia }: HttpContext) {
    const token = request.qs().token
    if (!token) {
      return inertia.render('errors/token_not_found')
    }
    return inertia.render('auth/reset-password', { token })
  }

  /**
   * 
   * Validates the PasswordResetToken.
   * Finds the user who's password is being updated by the user attacted to the reset token.
   * Resets the user's passwords and returns the user to the login page. 
   */
  async resetPassword({ request, inertia }: HttpContext) {
    try {      
      const payload = await request.validateUsing(passwordResetValidator)
      const passwordResetToken = await PasswordResetToken.findBy('token', payload.token)

      if (!passwordResetToken) {
        return inertia.render('errors/token_not_found')
      }

      if (passwordResetToken.expiresAt < DateTime.now()) {
        return inertia.render('errors/expired_token')
      }

      const user = await User.find(passwordResetToken.userId)
      if (user) {
        user.password = payload.password
        await user.save()
        await passwordResetToken.delete()
        return inertia.render('auth/login')
      }

    } catch (error) {
      const token = request.qs().token
      return inertia.render('auth/reset-password', { errors: error.messages, token })
    }
  }
}
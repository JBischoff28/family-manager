import type { HttpContext } from '@adonisjs/core/http'
import { registrationValidator } from '#validators/registration'
import mail from '@adonisjs/mail/services/main'

// Model Imports
import User from '#models/user'

// Service Imports
import AgeService from '#services/age-service'

export default class RegistrationsController {

  /**
   * Shows the registration page on the /register route
   */
  public async show({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  /**
   * 
   * Processes the submission of the registration form
   * and creates a new user if all data is valid. Then redirects the user
   * to the next step of account creation
   * 
   * Returns any errors caught by the registration validator if they exist
   * 
   * TODO: Implement different invite registration
   * TODO: Implement different forms of registration (i.e. Google, Facebook, etc.)
   */
  public async register({ inertia, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(registrationValidator)

      if (!AgeService.isAdult(payload.dateOfBirth)) {
        return inertia.render('errors/not_allowed/age_restriction')
      }
      
      const user = new User()
      await user.fill(payload)
      await user.save()
      
      console.log("Sending Email")
      await mail.send((message) => {
        message
          .to(user.email)
          .from('jbischoffdev@gmail.com')
          .subject('Verify Your Email Address - Family Manager')
          .htmlView('emails/verify-email', { user })
      }).then(() => console.log('Email Sent'))

      return inertia.render('confirmations/verify-email')
    } catch (error) {
      if (error.messages) {
        return inertia.render('auth/register', { errors: error.messages })
      } else {
        if (error.message.includes("UNIQUE constraint failed: users.username")) {
          return inertia.render('auth/register', { errors: [{ field: "username", rule: "unique", message: "This username is already in use, please try another one" }], step: 1 })
        } else {
          console.log(error)
          return inertia.render('auth/register', { errors: [{ field: "email", rule: "unique", message: "This email is already in use, please try another one" }], step: 1 })
        }
      }
    }
  }

  async verifyEmail({ request, auth, inertia }: HttpContext) {
    const email = request.qs().email
    const user = await User.findBy('email', email)

    if (user) {
      if (user.isVerified == false) {        
        user.isVerified = true
        await user.save()
        await auth.use('web').login(user)
        return inertia.render('confirmations/email-verified')
      } else {
        console.log('Already Verified')
        return inertia.render('confirmations/email-verified')
      }
    } else {
      return inertia.render('errors/not_found')
    }
  }
}
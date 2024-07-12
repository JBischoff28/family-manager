import type { HttpContext } from '@adonisjs/core/http'
import { registrationValidator } from '#validators/registration'
import User from '#models/user'

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
   * TODO: Add email verification functionality
   * TODO: Implement different invite registration
   * TODO: Implement different forms of registration (i.e. Google, Facebook, etc.)
   */
  public async register({ inertia, request, auth }: HttpContext) {
    try {      
      const payload = await request.validateUsing(registrationValidator)
      const user = new User()
      await user.fill(payload)
      await user.save()
      await auth.use('web').login(user)
      console.log("logged in as", user)
    } catch (error) {
      if (error.messages) {
        return inertia.render('auth/register', { errors: error.messages })
      } else {
        if (error.message.includes("UNIQUE constraint failed: users.username")) {
          return inertia.render('auth/register', { errors: [ { field: "username", rule: "unique", message: "This username is already in use, please try another one" } ], step: 1 })
        } else {
          return inertia.render('auth/register', { errors: [ { field: "email", rule: "unique", message: "This email is already in use, please try another one" } ], step: 1 })
        }
      }
    }
  }
}
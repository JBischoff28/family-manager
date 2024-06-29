import type { HttpContext } from '@adonisjs/core/http'
import { registrationValidator } from '#validators/registration'

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
   * TODO: Finish registration processing
   * TODO: Implement different invite registration
   * TODO: Implement different forms of registration (i.e. Google, Facebook, etc.)
   */
  public async register({ inertia, request, response }: HttpContext) {
    try {      
      const payload = await request.validateUsing(registrationValidator)
      console.log(payload)
    } catch (error) {
      return inertia.render('auth/register', { errors: error.messages })
    }
  }
}
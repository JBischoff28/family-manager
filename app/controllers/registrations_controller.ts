import type { HttpContext } from '@adonisjs/core/http'
import { registrationValidator } from '#validators/registration'

export default class RegistrationsController {
  public async show({ inertia }: HttpContext) {
    return inertia.render('auth/register') 
  }

  public async register({ inertia, request, response }: HttpContext) {
    try {      
      const payload = await request.validateUsing(registrationValidator)
      console.log(payload)
    } catch (error) {
      return inertia.render('auth/register', { errors: error.messages })
    }
  }
}
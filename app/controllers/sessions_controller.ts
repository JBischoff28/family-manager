import type { HttpContext } from '@adonisjs/core/http'

export default class SessionsController {
  /**
   * Shows the login page on the /login route
   */
  public async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }
}
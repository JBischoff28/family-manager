import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginWithEmailValidator } from '#validators/login'
import { loginWithUsernameValidator } from '#validators/login'

export default class SessionsController {
  /**
   * Shows the login page on the /login route
   */
  public async show({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * 
   * Validates sent data,
   * Checks send login information against the database,
   * Creates a new user session if the user credentials are correct
   * 
   * TODO: Redirect the logged in user to a dashboard home page
   */
  public async login({ request, auth }: HttpContext) {
    const data = request.all()
    if (data.username) {
      const payload = await request.validateUsing(loginWithUsernameValidator)
      const { username, password } = payload
      const user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
      console.log("Logged In with username")
    } else if (data.email) {
      const payload = await request.validateUsing(loginWithEmailValidator)
      const { email, password } = payload
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      console.log("Logged In with email")
    } else {
      console.log("Something went wrong, please try again.")
    }
  }
}
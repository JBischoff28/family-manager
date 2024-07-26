import type { HttpContext } from '@adonisjs/core/http'
import { loginWithEmailValidator } from '#validators/login'
import { loginWithUsernameValidator } from '#validators/login'

// Model Imports
import User from '#models/user'

// Service Imports
import UserService from '#services/user_service'

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
  public async login({ request, auth, inertia }: HttpContext) {
    const data = request.all()
    if (data.username) {
      const payload = await request.validateUsing(loginWithUsernameValidator)
      const { username, password } = payload
      try {
        await UserService.loginWithUsername(username, password, auth)
        console.log("Logged In with username")
      } catch (error) {
        return inertia.render('auth/login', { errors: [{ field: "credentials", rule: "incorrect", message: "Your username or password is incorrect. Please try again" }] })
      }
    } else if (data.email) {
      const payload = await request.validateUsing(loginWithEmailValidator)
      const { email, password } = payload
      try {
        await UserService.loginWithEmail(email, password, auth)
        console.log("Logged In with email")
      } catch (error) {
        return inertia.render('auth/login', { errors: [{ field: "credentials", rule: "incorrect", message: "Your email or password is incorrect. Please try again" }] })
      }
    } else {
      console.log("Something went wrong, please try again.")
    }
  }
}
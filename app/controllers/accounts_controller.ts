import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {

   async chooseInitialPlan({ inertia }: HttpContext) {
      return inertia.render('plans/initial-selection')
   }
}
import type { HttpContext } from '@adonisjs/core/http'

export default class HouseholdsController {

   async showCreate({ inertia }: HttpContext) {
      return inertia.render('household-creation/create-household')
   }
}
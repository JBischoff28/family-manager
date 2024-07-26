import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class AccountsController {

   async chooseInitialPlan({ inertia }: HttpContext) {
      const starter = env.get("STARTER_PLAN_ID")
      const plus = env.get("PLUS_PLAN_ID")
      const pro = env.get("PRO_PLAN_ID")
      return inertia.render('plans/initial-selection', { starter, plus, pro })
   }

   async addPlan({ request, inertia }: HttpContext) {
      try {
         const { selectedPlan } = request.all()
         console.log(`You choose ${selectedPlan}`)
      } catch (error) {
         const prevURL = request.headers().referer
         return inertia.render('errors/server_error', { error, prevURL })
      }
   }
}
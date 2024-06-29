/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const RegistrationsController = () => import('#controllers/registrations_controller')

router.on('/').renderInertia('home', { version: 6 })

router.group(() => {
  router.get('/register', [RegistrationsController, 'show']).as('register.show')
  router.post('/register', [RegistrationsController, 'register']).as('register.submit')
})
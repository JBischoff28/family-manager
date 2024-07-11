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
const SessionsController = () => import('#controllers/sessions_controller')

router.on('/').renderInertia('home', { version: 6 })

// Registration routes
router.group(() => {
  router.get('/register', [RegistrationsController, 'show']).as('register.show')
  router.post('/register', [RegistrationsController, 'register']).as('register.submit')
  router.get('/login', [SessionsController, 'show']).as('login.show')
})
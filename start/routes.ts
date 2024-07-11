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
const PasswordController = () => import('#controllers/passwords_controller')

router.on('/').renderInertia('home', { version: 6 })

// Authentication routes
router.group(() => {
  router.get('/register', [RegistrationsController, 'show']).as('register.show')
  router.post('/register', [RegistrationsController, 'register']).as('register.submit')
  router.get('/login', [SessionsController, 'show']).as('login.show')
  router.post('/login', [SessionsController, 'login']).as('login.login')
  router.get('/forgot-password', [PasswordController, 'show']).as('forgotPassword.show')
  router.post('/forgot-password', [PasswordController, 'forgotPassword']).as('forgotPassword.sendToken')
})
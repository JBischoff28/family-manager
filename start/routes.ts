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

router.on('/').redirect('/login')

// Authentication routes
router.group(() => {
  router.get('/register', [RegistrationsController, 'show']).as('register.show')
  router.post('/register', [RegistrationsController, 'register']).as('register.submit')
  router.get('/login', [SessionsController, 'show']).as('login.show')
  router.post('/login', [SessionsController, 'login']).as('login.login')
  router.get('/forgot-password', [PasswordController, 'showForgotPassword']).as('forgotPassword.show')
  router.post('/forgot-password', [PasswordController, 'sendResetToken']).as('forgotPassword.sendToken')
  router.get('/reset-password', [PasswordController, 'showResetPassword']).as('resetPassword.show')
  router.post('/reset-password', [PasswordController, 'resetPassword']).as('resetPassword.reset')
})

// Verification Routes
router.group(() => {
  router.get('/verify-email', [RegistrationsController, 'verifyEmail']).as('verifyEmail')
})

// Account Creation Routes
router.group(() => {
})
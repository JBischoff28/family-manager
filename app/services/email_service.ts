import mail from '@adonisjs/mail/services/main'

// Model Imports
import User from '#models/user'
import PasswordResetToken from '#models/password_reset_token'

class EmailService {

    public async sendPasswordResetToken(user: User, resetToken: PasswordResetToken) {
        await mail.send((message) => {
            message
                .to(user.email)
                .from('jbischoffdev@gmail.com')
                .subject('Reset Your Password - Family Manager')
                .htmlView('emails/reset-password', { user, resetToken })
        })
    }

    public async sendUserEmailVerification(user: User) {
        await mail.send((message) => {
            message
                .to(user.email)
                .from('jbischoffdev@gmail.com')
                .subject('Verify Your Email Address - Family Manager')
                .htmlView('emails/verify-email', { user })
        })
    }
}

export default new EmailService
import type { Authenticator } from '@adonisjs/auth';
import type { Authenticators } from '@adonisjs/auth/types';

// Model Imports
import User from "#models/user";

// Service Imports
import AgeService from '#services/age_service'

class UserService {

    public async loginUser(user: User, auth: Authenticator<Authenticators>) {
        await auth.use('web').login(user)
    }

    public isAdult(user: User) {
        const calculatedAge = AgeService.calculateAge(user.dateOfBirth)
        return calculatedAge >= 18
    }

    public async findUserByEmail(email: string) {
        const user = await User.findBy('email', email)
        return user
    }

    public async verifyEmailAddress(user: User) {
        user.isVerified = true
        await user.save()
    }

    public async loginWithEmail(email: string, password: string, auth: Authenticator<Authenticators>) {
        const user = await User.verifyCredentials(email, password)
        await this.loginUser(user, auth)
    }

    public async loginWithUsername(username: string, password: string, auth: Authenticator<Authenticators>) {
        const user = await User.verifyCredentials(username, password)
        await this.loginUser(user, auth)
    }
}

export default new UserService
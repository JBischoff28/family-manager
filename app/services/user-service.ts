// Model Imports
import User from "#models/user";

// Service Imports
import AgeService from '#services/age-service'

class UserService {

    public isAdult(user: User) {
        const calculatedAge = AgeService.calculateAge(user.dateOfBirth)
        return calculatedAge >= 18
    }

    public calculateAge(user: User) {
        return AgeService.calculateAge(user.dateOfBirth)
    }
}

export default new UserService
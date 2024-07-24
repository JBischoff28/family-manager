// Model Imports
import User from "#models/user";

// Service Imports
import AgeService from '#services/age_service'

class UserService {

    public isAdult(user: User) {
        const calculatedAge = AgeService.calculateAge(user.dateOfBirth)
        return calculatedAge >= 18
    }
}

export default new UserService
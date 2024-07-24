import { DateTime } from "luxon"

class AgeService {

    public isAdult(dateOfBirth: DateTime) {
        const calculatedAge = this.calculateAge(dateOfBirth)
        return calculatedAge >= 18
    }

    public calculateAge(dateOfBirth: DateTime) {
        const now = DateTime.now()
        const calculatedAge = now.diff(dateOfBirth, 'years').years
        return calculatedAge
    }
}

export default new AgeService
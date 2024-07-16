import { DateTime } from "luxon"

export const verifyUserAge = (dateOfBirth: DateTime) => {
    const calculatedAge = calculateUserAge(dateOfBirth)
    return calculatedAge >= 18;
}

export const calculateUserAge = (dateOfBirth: DateTime) => {
    const now = DateTime.now();
    const calculatedAge = now.diff(dateOfBirth, 'years').years;
    return calculatedAge;
}
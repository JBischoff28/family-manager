import Stripe from 'stripe'
import env from '#start/env'

// Model Imports
import User from '#models/user'

const stripe = new Stripe(env.get("STRIPE_SECRET_KEY"))

export class StripeService {

    public async createCustomer(user: User) {
        const customer = await stripe.customers.create({
            name: `${user.firstName} ${user.lastName}`,
            email: `${user.email}`
        })
        return customer
    }
}
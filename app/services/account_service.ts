// Model Imports
import Account from "#models/account";
import User from "#models/user";

class AccountService {

   public async createAccount(user: User, stripeCustomerId: string) {
      const account = await Account.create({ stripeCustomerId, userId: user.id })
      await account.related('primaryAccountHolder').associate(user)
      await account.save()
   }
}

export default new AccountService
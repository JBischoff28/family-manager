// Model Imports
import Account from "#models/account";
import User from "#models/user";

class AccountService {

   public async createAccount(user: User, stripeCustomerId: string) {
      const account = new Account()
      await account.related('primaryAccountHolder').associate(user)
      account.stripeCustomerId = stripeCustomerId
      await account.save()
   }
}

export default new AccountService
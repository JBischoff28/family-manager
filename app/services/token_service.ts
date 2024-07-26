import { randomBytes } from 'crypto'
import { DateTime } from 'luxon';

// Model Imports
import User from '#models/user';
import PasswordResetToken from '#models/password_reset_token';

class TokenService {

   private async generateToken() {
      const token: any = await new Promise((resolve, reject) => {
         randomBytes(24, (err, buffer) => {
            if (err) {
               reject(err);
            } else {
               resolve(buffer.toString('hex'));
            }
         });
      });
      return token
   }

   public async generatePasswordResetToken(user: User) {
      const resetToken = await PasswordResetToken.create({
         userId: user.id,
         token: await this.generateToken(),
         expiresAt: DateTime.local().plus({ hours: 1 })
       })
      return resetToken
   }
}

export default new TokenService
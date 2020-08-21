import jwt from 'jsonwebtoken';
import { UsersService } from '@services';
import { Queries } from './database.queries';
import bcrypt from 'bcrypt';
import { Constants } from '../../utils';

export class AuthService {
  public static async handleUserResetPassword(token: string, password: string, verifyPassword: string): Promise<boolean> {
    try {
      // check that token is valid and not expired
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD_RESET_SECRET) as {
        userId: number;
        email: string;
      };
      // check that same token is found on user resetPasswordToken field and password are same
      const user = await UsersService.getUsers(decoded.userId, undefined);
      if (user.length !== 1 || token !== user[0].resetPasswordToken || password !== verifyPassword) {
        return false;
      }
      // if yes && yes then
      // hash new password and save it on user db
      const encrypted = await bcrypt.hash(password, Constants.SALTROUNDS);
      // AND update resetPasswordToken to null
      await Queries.editGenericFields(['password', 'resetPasswordToken'], [encrypted, null], 'users', 'userId', user[0].userId);
      return true;
    } catch (error) {
      console.error(`Error while handling user reset password with token: ${token}`);
      console.error(error);
      return false;
    }
  }
}

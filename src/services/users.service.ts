import { User, UserCredentials, LoginResponse, UserAndCompany } from '@models';
import { Queries } from './database.queries';
import { mockUsers, mockCompanies } from '@mockdata';
import bcrypt from 'bcrypt';
import { Constants } from '../../utils';
import { EmailService } from './email.service';

export class UsersService {
  static async getUsers(
    userId: number,
    companyId: number,
    withCompany?: boolean,
    withoutDisabled?: boolean
  ): Promise<User[] | UserAndCompany[]> {
    if (process.env.REALDATA) {
      return await Queries.getUsers(userId ? [userId] : undefined, companyId, withCompany, withoutDisabled);
    } else {
      return mockUsers;
    }
  }

  static async addUser(user: User): Promise<User[]> {
    if (process.env.REALDATA) {
      const encrypted = await bcrypt.hash(user.password, Constants.SALTROUNDS);
      user.password = encrypted;
      const res = await Queries.addGenericEntry(user, 'users');
      if (res && res.length) {
        EmailService.sendInfoAboutCreatedUser(res[0]);
      }
      return res;
    } else {
      return [
        {
          ...user,
          userId: Math.floor(Math.random() * Math.floor(1000)) + 1,
        },
      ];
    }
  }

  // TODO: This is wrong! if editing only name, password gets messed up!!
  // IS THIS FIXED? I THINK YES
  static async editUser(user: User): Promise<User[]> {
    if (process.env.REALDATA) {
      if (user.password) {
        const encrypted = await bcrypt.hash(user.password, Constants.SALTROUNDS);
        user.password = encrypted;
      }
      const id: number = user.userId;
      delete user.userId;
      return await Queries.editGenericFields(Object.keys(user), Object.values(user), 'users', 'userId', id);
    } else {
      return [
        {
          ...user,
          userId: Math.floor(Math.random() * Math.floor(1000)) + 1,
        },
      ];
    }
  }

  static async deleteUser(userId: number): Promise<User[]> {
    if (process.env.REALDATA) {
      return await Queries.editGenericFields(['disabled'], [true], 'users', 'userId', userId);
    } else {
      return [mockUsers[0]];
    }
  }

  static async logInUser(userCredentials: UserCredentials): Promise<LoginResponse> {
    if (process.env.REALDATA) {
      // Fetch user and compare
      const userAndCompany = await this.getUsers(userCredentials.userId, undefined, true, true);
      if (userAndCompany.length === 1 && (await bcrypt.compare(userCredentials.password, userAndCompany[0].password))) {
        return {
          success: true,
          userAndCompany: userAndCompany[0] as UserAndCompany,
        };
      }
      return { success: false, userAndCompany: undefined };
    } else {
      return {
        success: true,
        userAndCompany: Object.assign({}, mockUsers[0], mockCompanies[0]),
      };
    }
  }
}

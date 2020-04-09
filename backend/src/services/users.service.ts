import { User, UserCredentials, LoginResponse } from "../../../models";
import { Queries } from "./database.queries";
import { mockUsers } from "../mockData";
import bcrypt from "bcrypt";
import { Constants } from "../backendUtils";

export class UsersService {
  static async getUsers(userId: number, companyId: number): Promise<User[]> {
    if (process.env.INPROD) {
      return await Queries.getUsers(userId ? [userId] : undefined, companyId);
    } else {
      return mockUsers;
    }
  }

  static async addUser(user: User): Promise<User[]> {
    if (process.env.INPROD) {
      const encrypted = await bcrypt.hash(user.password, Constants.SALTROUNDS);
      user.password = encrypted;
      return await Queries.addGenericEntry(user, "users");
    } else {
      return [
        {
          ...user,
          userId: Math.floor(Math.random() * Math.floor(1000)) + 1,
        },
      ];
    }
  }

  static async editUser(user: User): Promise<User[]> {
    if (process.env.INPROD) {
      const encrypted = await bcrypt.hash(user.password, Constants.SALTROUNDS);
      user.password = encrypted;
      return await Queries.editGenericEntry<User>(
        user,
        "users",
        "userId",
        user.userId
      );
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
    if (process.env.INPROD) {
      return await Queries.deleteGenericEntry<User[]>(
        "users",
        "userId",
        userId
      );
    } else {
      return [mockUsers[0]];
    }
  }

  static async logInUser(
    userCredentials: UserCredentials
  ): Promise<LoginResponse> {
    if (process.env.INPROD) {
      // Fetch user and compare
      const user = await this.getUsers(userCredentials.userId, undefined);
      if (
        user.length === 1 &&
        (await bcrypt.compare(userCredentials.password, user[0].password))
      ) {
        return { success: true, user: user[0] };
      }
      return { success: false, user: undefined };
    } else {
      return { success: true, user: mockUsers[0] };
    }
  }
}

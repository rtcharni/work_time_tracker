import { User, UserCredentials } from "../../../models";
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

  static async addUser(user: User): Promise<User> {
    if (process.env.INPROD) {
      const encrypted = await bcrypt.hash(user.password, Constants.SALTROUNDS);
      user.password = encrypted;
      return await Queries.addGenericEntry(user, "users");
    } else {
      return {
        ...user,
        userId: Math.floor(Math.random() * Math.floor(1000)) + 1
      };
    }
  }

  static async logInUser(userCredentials: UserCredentials) {
    if (process.env.INPROD) {
      // Fetch user and compare
      if (await bcrypt.compare(userCredentials.password, "ENCRYPTEDHERE")) {
        // OK!
      } else {
        // NOT OK
      }
    } else {
    }
  }
}

import { User } from "../../../models";
import { Queries } from "./database.queries";
import { mockUsers } from "../mockData";

export class UsersService {
  static async getUsers(userId: number, companyId: number): Promise<User[]> {
    if (process.env.INPROD) {
      return await Queries.getUsers(userId ? [userId] : undefined, companyId);
    } else {
      return mockUsers;
    }
  }
}

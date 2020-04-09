import jwt from "jsonwebtoken";
import { User } from "../../../models";

export class TokenManagement {
  public static generateToken(user: User): string {
    try {
      return jwt.sign({ ...user, password: undefined }, process.env.JWTSECRET, {
        expiresIn: 60 * 30,
        issuer: "Work Time Tracker",
        subject: user.email,
      });
    } catch (error) {
      console.log(`Error while generating token`);
      console.error(error);
    }
  }

  public static validateToken(token: string): object {
    try {
      return jwt.verify(token, process.env.JWTSECRET) as object;
    } catch (error) {
      console.log(`Error while verifying token`);
      console.error(error);
      return undefined;
    }
  }
}

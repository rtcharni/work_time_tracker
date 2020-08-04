import jwt from "jsonwebtoken";
import { User } from "../../models";
import { Request, Response, NextFunction } from "express";

export class TokenManagement {
  public static generateLoginToken(user: User): string {
    try {
      return jwt.sign(
        { ...user, password: undefined },
        process.env.JWT_TOKEN_SECRET,
        {
          expiresIn: 60 * 60,
          issuer: "Work Time Tracker",
          subject: user.email,
        }
      );
    } catch (error) {
      console.error(`Error while generating login token`);
      console.error(error);
    }
  }

  public static generateResetPasswordToken(user: User): string {
    try {
      return jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.JWT_PASSWORD_RESET_SECRET,
        {
          expiresIn: 60 * 30,
          issuer: "Work Time Tracker",
          subject: user.email,
        }
      );
    } catch (error) {
      console.error(`Error while generating reset password token`);
      console.error(error);
    }
  }

  public static validateLoginTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log("IN MIDDLEWARE");
      const token: string = req.cookies.auth;
      if (!token) {
        console.error("No existing token");
        res.send({ redirectToLogin: true });
        // res.redirect(302, "http://localhost:3000/");
        return;
      }
      jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      next();
    } catch (error) {
      console.error(`Error while verifying token`);
      console.error(error);
      // res.redirect("http://localhost:3000/login");
      res.send({ redirectToLogin: true });
      return;
    }
  }
}

import jwt from "jsonwebtoken";
import { User } from "../../models";
import { Request, Response, NextFunction } from "express";

export class TokenManagement {
  public static generateToken(user: User): string {
    try {
      return jwt.sign({ ...user, password: undefined }, process.env.JWTSECRET, {
        expiresIn: 60 * 30,
        issuer: "Work Time Tracker",
        subject: user.email,
      });
    } catch (error) {
      console.error(`Error while generating token`);
      console.error(error);
    }
  }

  public static validateTokenMiddleware(
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
      jwt.verify(token, process.env.JWTSECRET);
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

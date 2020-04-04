import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain, body } from "express-validator";
import { Utils } from "../backendUtils";
import { UsersService } from "../services";
import { User, UserCredentials, LoginResponse } from "../../../models";
import { Validation } from "../../../utils";

export class UsersController {
  public getUsers(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      query("userId")
        .isNumeric()
        .toInt()
        .optional(),
      query("companyId")
        .isNumeric()
        .toInt()
        .optional(),
      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const users: User[] = await UsersService.getUsers(
            req.query.userId,
            req.query.companyId
          );
          res.send(users);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }

  public addUser(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body([
        "password",
        "companyId",
        "email",
        "firstName",
        "lastName",
        "admin"
      ]).exists(),
      body().custom(value => {
        return true;
        // if (Validation.isUserValid(value)) {
        //   return true;
        // }
        // throw new Error("User is not valid");
      }),
      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user: User = await UsersService.addUser(req.body as User);
          res.send(user);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }

  public logInUser(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      body(["userId", "password"]).exists(),
      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const loginResponse: LoginResponse = await UsersService.logInUser(
            req.body as UserCredentials
          );
          if (loginResponse.success) {
            // generate token and add to auth header
          }
          res.send(loginResponse);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }
}

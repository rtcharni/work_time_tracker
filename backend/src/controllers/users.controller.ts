import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain } from "express-validator";
import { Utils } from "../backendUtils";
import { UsersService } from "../services";
import { User } from "../../../models";

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
}

import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";
import { query, ValidationChain, body, param } from "express-validator";
import { BackendUtils, TokenManagement } from "../backendUtils";
import { UsersService } from "../services";
import {
  User,
  UserCredentials,
  LoginResponse,
  UserAndCompany,
} from "../../models";
import { Validation } from "../../utils";

export class UsersController {
  public getUsers(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      query("userId").isNumeric().toInt().optional(),
      query("companyId").isNumeric().toInt().optional(),
      query("withCompany").isBoolean().toBoolean().optional(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const users: User[] | UserAndCompany[] = await UsersService.getUsers(
            req.query.userId,
            req.query.companyId,
            req.query.withCompany
          );
          res.send(users);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler("Could not fetch events!"),
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
        "admin",
      ]).exists(),
      body().custom((value) => {
        return true;
        // if (Validation.isUserValid(value)) {
        //   return true;
        // }
        // throw new Error("User is not valid");
      }),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user: User[] = await UsersService.addUser(req.body as User);
          res.send(user);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler("Could not fetch events!"),
    ];
  }

  public editUser(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      param("userId").isNumeric().toInt(),
      body([
        "password",
        "companyId",
        "email",
        "firstName",
        "lastName",
        "admin",
      ]).exists(),
      body().custom((value) => {
        return true;
        // if (Validation.isUserValid(value)) {
        //   return true;
        // }
        // throw new Error("User is not valid");
      }),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user: User[] = await UsersService.editUser({
            ...req.body,
            userId: req.params.userId,
          } as User);
          res.send(user);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler("Could not fetch events!"),
    ];
  }

  public deleteUser(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      param("userId").isNumeric().toInt(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const deletedUser: User[] = await UsersService.deleteUser(
            (req.params.userId as unknown) as number
          );
          res.send(deletedUser);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler("Could not fetch events!"),
    ];
  }
}

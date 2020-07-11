import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";
import { ValidationChain, body } from "express-validator";
import { BackendUtils, TokenManagement } from "../backendUtils";
import { UsersService } from "../services";
import { UserCredentials, LoginResponse } from "../../../models";

export class AuthController {
  public logInUser(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      body(["userId", "password"]).exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const loginResponse: LoginResponse = await UsersService.logInUser(
            req.body as UserCredentials
          );
          if (loginResponse.success) {
            loginResponse.userAndCompany.password = null;
            const token = TokenManagement.generateToken(
              loginResponse.userAndCompany
            );
            // TODO, modify cookie to be more secure
            res.cookie("auth", token, { httpOnly: true });
            console.log(`You are logged in!`);
          }
          res.send(loginResponse);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler("Could not login user!"),
    ];
  }

  public logOutUser(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      //   body(["userId", "password"]).exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // TODO THIS
          res.clearCookie("auth");
          res.send(null);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler("Could not logout user!"),
    ];
  }
}

import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { ValidationChain, body } from 'express-validator';
import { BackendUtils, TokenManagement } from '../backendUtils';
import { UsersService, AuthService, Queries, EmailService } from '@services';
import { UserCredentials, LoginResponse } from '@models';
import jwt from 'jsonwebtoken';

export class AuthController {
  public logInUser(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body(['userId', 'password']).exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const loginResponse: LoginResponse = await UsersService.logInUser(req.body as UserCredentials);
          if (loginResponse.success) {
            // loginResponse.userAndCompany.password = null; // return password or null
            const token = TokenManagement.generateLoginToken(loginResponse.userAndCompany);
            // TODO, modify cookie to be more secure
            res.cookie('auth', token, { httpOnly: true });
            console.log(`You are logged in!`);
          }
          res.send(loginResponse);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not login user!'),
    ];
  }

  public logOutUser(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      //   body(["userId", "password"]).exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // TODO THIS
          res.clearCookie('auth');
          res.send(true);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not logout user!'),
    ];
  }

  public forgotPassword(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body('userId').isInt().toInt(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // find user with given user id
          const user = await UsersService.getUsers(req.body.userId, undefined, undefined);

          // found 0 or more than 1 user
          if (user.length !== 1) {
            res.send(true);
            return;
          }

          if (user[0].resetPasswordToken) {
            try {
              jwt.verify(user[0].resetPasswordToken, process.env.JWT_PASSWORD_RESET_SECRET);
              console.log(`User with ID ${user[0].userId} has already requested reset password in the past 30 min`);
              res.send(true);
            } catch (error) {
              console.log(`User has old reset password token that has expired`);
              // do nothing and continue code execution
            }
          }

          // send recovery email to user email
          // generate password reset token
          const token = TokenManagement.generateResetPasswordToken(user[0]);
          EmailService.sendRecoveryLink(user[0].email, token);
          // Save token to user db
          Queries.editGenericFields(['resetPasswordToken'], [token], 'users', 'userId', user[0].userId);
          // No need to await either of requests

          res.send(true);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could complete forgot password flow!'),
    ];
  }

  public resetPassword(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body('token').exists(),
      body('password').exists(),
      body('verifyPassword').exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const success: boolean = await AuthService.handleUserResetPassword(
            req.body.token,
            req.body.password,
            req.body.verifyPassword
          );
          res.send(success);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not reset user password!'),
    ];
  }

  public informUserCreated(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body(['userId', 'firstName', 'email']).exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          EmailService.sendInfoAboutCreatedUser(req.body);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not inform user about account creation!'),
    ];
  }
}

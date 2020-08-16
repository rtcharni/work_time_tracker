import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { query, ValidationChain } from 'express-validator';
import { BackendUtils } from '../backendUtils';
import { WorkMessage } from '../../models';
import { WorkMessagesService } from '../services';

export class WorkMessagesController {
  public getWorkMessages(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      query('workMessageId').isNumeric().toInt().optional(),
      query('userId').isNumeric().toInt().optional(),
      query('companyId').isNumeric().toInt().optional(), // maybe this should be required!
      query('workEntryId').isNumeric().toInt().optional(),
      query('from').isISO8601().optional(),
      query('to').isISO8601().optional(),
      BackendUtils.validatorHandler(),

      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const workMessages: WorkMessage[] = await WorkMessagesService.getWorkMessages(
            req.query.workMessageId,
            req.query.userId,
            req.query.companyId,
            req.query.workEntryId,
            req.query.from,
            req.query.to
          );
          res.send(workMessages);
        } catch (error) {
          next(error);
        }
      },

      BackendUtils.errorHandler('Could not fetch Work messages!'),
    ];
  }

  // public addWorkMessage(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
  //   return [
  //     // Request param validators.
  //     body([
  //       "password",
  //       "companyId",
  //       "email",
  //       "firstName",
  //       "lastName",
  //       "admin",
  //     ]).exists(),
  //     body().custom((value) => {
  //       return true;
  //       // if (Validation.isUserValid(value)) {
  //       //   return true;
  //       // }
  //       // throw new Error("User is not valid");
  //     }),
  //     // Error handler for request params
  //     BackendUtils.validatorHandler(),
  //     // Actual Request handler
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         const user: User[] = await UsersService.addUser(req.body as User);
  //         res.send(user);
  //       } catch (error) {
  //         next(error);
  //       }
  //     },
  //     // Error handler
  //     BackendUtils.errorHandler("Could not fetch events!"),
  //   ];
  // }

  // public editWorkMessage(): (
  //   | ValidationChain
  //   | RequestHandler
  //   | ErrorRequestHandler
  // )[] {
  //   return [
  //     // Request param validators.
  //     param("userId").isNumeric().toInt(),
  //     body().not().isEmpty(),
  //     body().custom((value) => {
  //       return true;
  //       // if (Validation.isUserValid(value)) {
  //       //   return true;
  //       // }
  //       // throw new Error("User is not valid");
  //     }),
  //     // Error handler for request params
  //     BackendUtils.validatorHandler(),
  //     // Actual Request handler
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         const user: User[] = await UsersService.editUser({
  //           ...req.body,
  //           userId: req.params.userId,
  //         } as User);
  //         res.send(user);
  //       } catch (error) {
  //         next(error);
  //       }
  //     },
  //     // Error handler
  //     BackendUtils.errorHandler("Could not fetch events!"),
  //   ];
  // }

  // public deleteWorkMessage(): (
  //   | ValidationChain
  //   | RequestHandler
  //   | ErrorRequestHandler
  // )[] {
  //   return [
  //     // Request param validators.
  //     param("userId").isNumeric().toInt(),
  //     // Error handler for request params
  //     BackendUtils.validatorHandler(),
  //     // Actual Request handler
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         const deletedUser: User[] = await UsersService.deleteUser(
  //           (req.params.userId as unknown) as number
  //         );
  //         res.send(deletedUser);
  //       } catch (error) {
  //         next(error);
  //       }
  //     },
  //     // Error handler
  //     BackendUtils.errorHandler("Could not fetch events!"),
  //   ];
  // }
}

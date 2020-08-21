import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { query, ValidationChain, body, param } from 'express-validator';
import { BackendUtils } from '../backendUtils';
import { WorkMessage } from '@models';
import { WorkMessagesService } from '@services';

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

  public addWorkMessage(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body('workMessage').exists(),
      body('userId').isInt().toInt(),
      body('companyId').isInt().toInt(),
      body('workEntryId').isInt().toInt(),

      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const workMessage: WorkMessage[] = await WorkMessagesService.addWorkMessage(
            req.body.workMessage,
            req.body.userId,
            req.body.companyId,
            req.body.workEntryId
          );
          res.send(workMessage);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not add work message!'),
    ];
  }

  public editWorkMessage(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      param('workMessageId').isInt().toInt(),
      body('workMessage').exists(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const workMessage: WorkMessage[] = await WorkMessagesService.editWorkMessage(
            (req.params.workMessageId as unknown) as number,
            req.body.workMessage
          );
          res.send(workMessage);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not edit work message!'),
    ];
  }

  public deleteWorkMessage(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      param('workMessageId').isInt().toInt(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const workMessage: WorkMessage[] = await WorkMessagesService.deleteWorkMessage(
            (req.params.workMessageId as unknown) as number
          );
          res.send(workMessage);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not delete work message!'),
    ];
  }
}

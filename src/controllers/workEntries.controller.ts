import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { query, ValidationChain, param, body } from 'express-validator';
import { BackendUtils, TokenManagement, Validation } from '../backendUtils';
import { WorkEntriesService } from '@services';
import { WorkEntry } from '@models';

export class WorkEntriesController {
  public getWorkEntries(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      query('userId').isArray().toArray().optional(),
      query('workEntryId').isNumeric().toInt().optional(),
      query('companyId').isNumeric().toInt().optional(),
      query('from').isISO8601().optional(),
      query('to').isISO8601().optional(),

      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Request action validator

      // TODO.. Not working because userId is an array and not just one number
      // TokenManagement.validateRequestActionMiddleware([{propName:'userId',locatedInRequest:'query'}]),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const workEntries: WorkEntry[] = await WorkEntriesService.getWorkEntries(
            req.query.userId,
            req.query.workEntryId,
            req.query.companyId,
            req.query.from,
            req.query.to
          );
          res.send(workEntries);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not fetch work entries!'),
    ];
  }

  public addWorkEntry(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      body(['companyId', 'userId']).exists(),
      body().custom(value => {
        if (Validation.isWorkEntryValid(value)) {
          return true;
        }
        throw new Error('Work entry not valid');
      }),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Request action validator
      TokenManagement.validateRequestActionMiddleware([{ propName: 'userId', locatedInRequest: 'body', mustBeAdmin: false }]),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          console.log(req.cookies.auth);
          const result: WorkEntry[] = await WorkEntriesService.addWorkEntry(req.body as WorkEntry);
          res.send(result);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not add work entry!'),
    ];
  }

  public editWorkEntry(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      param('workEntryId').isNumeric().toInt(),
      body(['companyId', 'userId']).exists(),
      body().custom(value => {
        if (Validation.isWorkEntryValid(value)) {
          return true;
        }
        throw new Error('Work entry not valid');
      }),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Request action validator
      TokenManagement.validateRequestActionMiddleware([{ propName: 'userId', locatedInRequest: 'body', mustBeAdmin: false }]),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result: WorkEntry[] = await WorkEntriesService.editWorkEntry({
            ...req.body,
            workEntryId: req.params.workEntryId,
          } as WorkEntry);
          res.send(result);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not edit work entry!'),
    ];
  }

  public deleteWorkEntry(): (ValidationChain | RequestHandler | ErrorRequestHandler)[] {
    return [
      // Request param validators.
      param('workEntryId').isNumeric().toInt(),
      query(['companyId', 'userId']).isNumeric().toInt(),
      // Error handler for request params
      BackendUtils.validatorHandler(),
      // Request action validator
      TokenManagement.validateRequestActionMiddleware([{ propName: 'userId', locatedInRequest: 'query', mustBeAdmin: false }]),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result: WorkEntry[] = await WorkEntriesService.deleteWorkEntry((req.params.workEntryId as unknown) as number);
          res.send(result);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      BackendUtils.errorHandler('Could not delete work entry!'),
    ];
  }
}

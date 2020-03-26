import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain, param } from "express-validator";
import { Utils } from "../utils";
import { mockWorkEntries } from "../mockData/workentries";
import { WorkEntriesService } from "../services/workEntries.service";

export class WorkEntriesController {
  public getWorkEntries(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      query("companyId")
        .isNumeric()
        .optional(),
      query("userId")
        .isNumeric()
        .optional(),

      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await WorkEntriesService.getWorkEntries(
            req.query.companyId,
            req.query.userId
          );
          res.send(result);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }
}

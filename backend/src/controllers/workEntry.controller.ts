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

export class WorkEntryController {
  public getWorkEntries(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      query("companyName").optional(),
      query("userId")
        .isNumeric()
        .optional(),

      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          console.log(req.query);
          res.send(mockWorkEntries);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }
}

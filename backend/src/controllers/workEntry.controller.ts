import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain } from "express-validator";
import { Utils } from "../utils";

export class WorkEntryController {
  public getWorkEntries(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      //   query("entityId").isAlphanumeric(),

      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          res.send({ msg: "WORKS" });
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }
}

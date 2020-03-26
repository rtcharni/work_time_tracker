import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain, param, body } from "express-validator";
import { Utils } from "../utils";
import { mockWorkEntries } from "../mockData/workentries";
import { WorkEntriesService } from "../services/workEntries.service";
import { WorkEntry } from "../../../models";

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
        .toInt()
        .optional(),
      query("userId")
        .isNumeric()
        .toInt()
        .optional(),
      query("from")
        .isISO8601()
        .optional(),
      query("to")
        .isISO8601()
        .optional(),

      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const workEntries: WorkEntry[] = await WorkEntriesService.getWorkEntries(
            req.query.companyId,
            req.query.userId,
            req.query.from,
            req.query.to
          );
          res.send(workEntries);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }

  public addWorkEntry(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      body([
        "companyId",
        "userId",
        "title",
        "details",
        "customerName",
        "breakMIN",
        "startTime",
        "endTime"
      ]).exists(),
      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          console.log(req.body);
          const result: any = null;
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

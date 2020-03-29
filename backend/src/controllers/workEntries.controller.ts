import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain, param, body } from "express-validator";
import { Utils } from "../backendUtils";
import { mockWorkEntries } from "../mockData";
import { WorkEntriesService } from "../services/workEntries.service";
import { WorkEntry } from "../../../models";
import { Validation } from "../../../utils";

export class WorkEntriesController {
  public getWorkEntries(): (
    | ValidationChain
    | RequestHandler
    | ErrorRequestHandler
  )[] {
    return [
      // Request param validators.
      query("userId")
        .isNumeric()
        .toInt()
        .optional(),
      query("workEntryId")
        .isNumeric()
        .toInt()
        .optional(),
      query("companyId")
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
      body().custom(value => {
        if (Validation.isWorkEntryValid(value)) {
          return true;
        }
        throw new Error("Work entry not valid");
      }),
      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // console.log(req.body);
          const result: WorkEntry = await WorkEntriesService.addWorkEntry(
            req.body as WorkEntry
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

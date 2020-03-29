import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler
} from "express";
import { query, ValidationChain } from "express-validator";
import { Utils } from "../backendUtils";
import { CompaniesService } from "../services/companies.service";
import { Company } from "../../../models";

export class CompaniesController {
  public getCompanies(): (
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
      // Error handler for request params
      Utils.validatorHandler(),
      // Actual Request handler
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const companies: Company[] = await CompaniesService.getCompanies(
            req.query.companyId
          );
          res.send(companies);
        } catch (error) {
          next(error);
        }
      },
      // Error handler
      Utils.errorHandler("Could not fetch events!")
    ];
  }
}

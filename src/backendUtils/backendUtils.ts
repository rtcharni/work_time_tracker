import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator';

export class BackendUtils {
  /**
   * Handles request's validation errors.
   */
  public static validatorHandler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Invalid parameters!', data: errors.array() });
      }
      next();
    };
  }

  /**
   * Handles any errors that might occur during requests.
   * @param message error message
   */
  public static errorHandler(message: string): ErrorRequestHandler {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      res.status(500).send({
        message,
        data: (err as Error).message,
      });
    };
  }

  /**
   * Converts objects empty string values to nulls
   * @param obj object to check and convert
   */
  public static convertObjectEmptyStringPropsToNull<T>(obj: T): T {
    const temp = (obj as unknown) as any;
    for (const k of Object.keys(temp)) {
      if (temp[k] === '') {
        temp[k] = null;
      }
    }
    return temp as T;
  }
}

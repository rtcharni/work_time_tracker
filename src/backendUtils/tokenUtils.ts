import jwt from 'jsonwebtoken';
import { User } from '@models';
import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { ValidationChain } from 'express-validator';

export class TokenManagement {
  public static generateLoginToken(user: User): string {
    try {
      return jwt.sign({ ...user, password: undefined }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: 60 * 60,
        issuer: 'Work Time Tracker',
        subject: user.email,
      });
    } catch (error) {
      console.error(`Error while generating login token`);
      console.error(error);
    }
  }

  public static generateResetPasswordToken(user: User): string {
    try {
      return jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_PASSWORD_RESET_SECRET, {
        expiresIn: 60 * 30,
        issuer: 'Work Time Tracker',
        subject: user.email,
      });
    } catch (error) {
      console.error(`Error while generating reset password token`);
      console.error(error);
    }
  }

  public static validateLoginTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('IN MIDDLEWARE');
      const token: string = req.cookies.auth;
      if (!token) {
        console.error('No existing token');
        res.send({ redirectToLogin: true });
        // res.redirect(302, "http://localhost:3000/");
        return;
      }
      jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      next();
    } catch (error) {
      console.error(`Error while verifying token`);
      console.error(error);
      // res.redirect("http://localhost:3000/login");
      res.send({ redirectToLogin: true });
      return;
    }
  }

  public static validateRequestActionMiddleware(reqPropCheck: RequestPropertyCheck[]): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('IN validateRequestActionMiddleware');
        const token = jwt.decode(req.cookies.auth) as {
          [key: string]: any;
        };

        if (!this.requestToOwnCompany(req, token.companyId)) {
          return res.status(403).send(`Request is not allowed`);
        }

        if (token.admin) {
          return next();
        }

        for (const checkProp of reqPropCheck) {
          if (token[checkProp.propName] !== req[checkProp.locatedInRequest][checkProp.propName]) {
            console.error(
              `Request is not allowed. Token property ${checkProp.propName} with value ${
                token[checkProp.propName]
              } is not matching request value of ${req[checkProp.locatedInRequest][checkProp.propName]}`
            );
            return res.status(403).send(`Request is not allowed`);
          }
        }

        return next();
      } catch (error) {
        console.error(`Error while validating request action`);
      }
    };
  }

  private static requestToOwnCompany(req: Request, tokenCompany: number): boolean {
    if (req.query.companyId && +req.query.companyId !== tokenCompany) {
      console.error(`Request is not allowed. Company ${tokenCompany} is trying access other company ${req.query.companyId}`);
      return false;
    }
    if (req.body.companyId && +req.body.companyId !== tokenCompany) {
      console.error(`Request is not allowed. Company ${tokenCompany} is trying access other company ${req.body.companyId}`);
      return false;
    }
    if (req.params.companyId && +req.params.companyId !== tokenCompany) {
      console.error(`Request is not allowed. Company ${tokenCompany} is trying access other company ${req.params.companyId}`);
      return false;
    }
    return true;
  }
}

interface RequestPropertyCheck {
  propName: string;
  locatedInRequest: 'query' | 'body' | 'params';
}

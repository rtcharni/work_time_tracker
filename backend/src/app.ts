import * as expressTypes from "express";
// tslint:disable-next-line: no-var-requires
const express = require("express");
import { ApiRoutes } from "./routes";
import cors from "cors";

export class App {
  private app: any;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initMiddlewares();
    this.initRoutes();
  }

  public run(): void {
    this.app.listen(this.port, () => {
      console.log(`App is running on the port ${this.port}`);
    });
  }

  private initMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initRoutes(): void {
    this.app.use("/api", new ApiRoutes().router);
    // invalid route
    this.app.use(
      (
        req: expressTypes.Request,
        res: expressTypes.Response,
        next: expressTypes.NextFunction
      ) => {
        res.status(404).send({ error: `Route for ${req.path} not found` });
      }
    );
  }
}

import * as express from "express";
// const express= require("express");
import { ApiRoutes } from "./routes";

export class App {
  private app: any;
  private port: number;

  constructor(port: number) {
    this.app = express;
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
    // CORS!?
  }

  private initRoutes(): void {
    this.app.use("/api", new ApiRoutes().router);
    // invalid route
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(404).send({ error: `Route for ${req.path} not found` });
      }
    );
  }
}

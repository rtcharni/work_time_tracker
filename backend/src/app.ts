import * as expressTypes from "express";
// tslint:disable-next-line: no-var-requires
// const express = require("express");
import Express, { Request, Response, NextFunction } from "express";
import { ApiRoutes } from "./routes";
import cors from "cors";

export class App {
  private app: Express.Application;
  private port: number | string;

  constructor(port: number | string) {
    this.app = Express();
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
    this.app.use(Express.json());
    this.app.use(cors());
    this.app.disable("x-powered-by");
    // TODO CHECK HELMET PACKAGE
  }

  private initRoutes(): void {
    this.app.use("/api", new ApiRoutes().router);
    // invalid route
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send({ error: `Route for ${req.path} not found` });
    });
  }
}

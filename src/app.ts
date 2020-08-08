import Express, { Request, Response, NextFunction } from "express";
import path from "path";
import { DatabaseRoutes, AuthRoutes } from "./routes";
// import cors from "cors";
import cookieParser from "cookie-parser";
import { TokenManagement } from "./backendUtils";
import { AuthController } from "./controllers";

export class App {
  private app: Express.Application;
  private port: number | string;

  constructor(port: number | string) {
    console.log(`I am in App constructor.`);
    console.log(`__dirname: ${__dirname}`);
    console.log(`CWD: ${process.cwd()}`);
    this.app = Express();
    this.port = port;
    this.initMiddlewares();
    this.initRoutes();
    this.renderFrontendInProduction();
  }

  public renderFrontendInProduction(): void {
    if (process.env.NODE_ENV === "production" && process.env.REALDATA) {
      console.log(
        `Backend reders Frontend! App is in the REALDATA and NODE_ENV is ${process.env.NODE_ENV}`
      );
      this.app.use(
        Express.static(path.join(__dirname, "../../client/dist/client"))
      );
      this.app.use((req: Request, res: Response, next: NextFunction) => {
        res.sendFile(
          path.join(__dirname, "../../client/dist/client/index.html")
        );
      });
      // this.app.get("*", (req, res) => {
      //   console.log(`I hit final route!`);
      //   res.sendFile(path.join(__dirname, "../client/dist/client/index.html"));
      // });
    }
  }

  public run(): void {
    this.app.listen(this.port, () => {
      console.log(`App is running on the port ${this.port}`);
    });
  }

  private initMiddlewares(): void {
    this.app.use(Express.json());
    this.app.use(cookieParser());
    this.app.disable("x-powered-by");
    // TODO CHECK HELMET PACKAGE
  }

  private initRoutes(): void {
    this.app.use(
      "/api/database",
      // TokenManagement.validateTokenMiddleware,
      new DatabaseRoutes().router
    );
    this.app.use("/api/auth", new AuthRoutes().router);
  }
}
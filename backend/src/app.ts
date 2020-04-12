import Express, { Request, Response, NextFunction } from "express";
import { DatabaseRoutes, AuthRoutes } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { TokenManagement } from "./backendUtils";
import { AuthController } from "./controllers";

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
    this.app.use(
      cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true,
        // allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        // exposedHeaders: ["Authorization", "Cookie"],
      })
    );
    this.app.use(cookieParser());
    this.app.disable("x-powered-by");
    // TODO CHECK HELMET PACKAGE
  }

  private initRoutes(): void {
    this.app.use(
      "/api/database",
      TokenManagement.validateTokenMiddleware,
      new DatabaseRoutes().router
    );
    this.app.use("/api/auth", new AuthRoutes().router);
    // invalid route
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send({ error: `Route for ${req.path} not found` });
    });
  }
}

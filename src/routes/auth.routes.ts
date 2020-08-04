import { Router } from "express";
import { AuthController } from "../controllers";

export class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initAuthRoutes();
  }

  /**
   * Initializes the router for '/api/auth'.
   */
  private initAuthRoutes(): void {
    const authController = new AuthController();
    this.router.use(
      "",
      Router()
        .post("/login", authController.logInUser())
        .post("/logout", authController.logOutUser())
        .post("/forgotpassword", authController.forgotPassword())
        .post("/resetpassword", authController.resetPassword())
    );
  }
}

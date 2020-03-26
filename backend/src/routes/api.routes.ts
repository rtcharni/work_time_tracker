import { Router } from "express";
import { WorkEntryController } from "../controllers";

export class ApiRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initWorkEntryRoutes();
  }

  /**
   * Initializes the router for '/workentries'.
   */
  private initWorkEntryRoutes(): void {
    const workEntryController = new WorkEntryController();
    this.router.use(
      "/workentries",
      Router()
        // .get("/:id")
        .get("", workEntryController.getWorkEntries())
      // .post("")
      // .patch("/:id")
    );
  }
}

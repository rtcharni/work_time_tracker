import { Router } from "express";
import { WorkEntriesController } from "../controllers";

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
    const workEntryController = new WorkEntriesController();
    this.router.use(
      "/workentries",
      Router()
        // .get("/:id")
        .get("", workEntryController.getWorkEntries())
        .post("", workEntryController.addWorkEntry())
      // .patch("/:id")
    );
  }
}

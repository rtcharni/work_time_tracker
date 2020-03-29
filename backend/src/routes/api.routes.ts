import { Router } from "express";
import {
  WorkEntriesController,
  CompaniesController,
  UsersController
} from "../controllers";

export class ApiRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initWorkEntryRoutes();
    this.initCompaniesRoutes();
    this.initUsersRoutes();
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

  private initCompaniesRoutes(): void {
    const companiesController = new CompaniesController();
    this.router.use(
      "/companies",
      Router().get("", companiesController.getCompanies())
    );
  }

  private initUsersRoutes(): void {
    const usersController = new UsersController();
    this.router.use("/users", Router().get("", usersController.getUsers()));
  }
}

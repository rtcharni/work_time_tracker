import { Router } from 'express';
import { WorkEntriesController, CompaniesController, UsersController } from '../controllers';

export class DatabaseRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initWorkEntryRoutes();
    this.initCompaniesRoutes();
    this.initUsersRoutes();
    this.initWorkMessagesRoutes();
  }

  /**
   * Initializes the router for '/workentries'.
   */
  private initWorkEntryRoutes(): void {
    const workEntryController = new WorkEntriesController();
    this.router.use(
      '/workentries',
      Router()
        .get('', workEntryController.getWorkEntries())
        .post('', workEntryController.addWorkEntry())
        .put('/:workEntryId', workEntryController.editWorkEntry())
        .delete('/:workEntryId', workEntryController.deleteWorkEntry())
    );
  }

  private initCompaniesRoutes(): void {
    const companiesController = new CompaniesController();
    this.router.use('/companies', Router().get('', companiesController.getCompanies()));
  }

  private initUsersRoutes(): void {
    const usersController = new UsersController();
    this.router.use(
      '/users',
      Router()
        // .post("/login", usersController.logInUser())
        .get('', usersController.getUsers())
        .post('', usersController.addUser())
        .patch('/:userId', usersController.editUser())
        .delete('/:userId', usersController.deleteUser())
    );
  }

  private initWorkMessagesRoutes(): void {
    const usersController = new WorkMessagesController();
    this.router.use(
      '/workmessages',
      Router().get('', null).post('', null).patch('/:workMessageId', null).delete('/:workMessageId', null)
    );
  }
}

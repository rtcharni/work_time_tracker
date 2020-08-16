import { WorkMessage } from '../../models';
import { Queries } from './database.queries';

export class WorkMessagesService {
  static async getWorkMessages(
    workMessageId: number,
    userId: number,
    companyId: number,
    workEntryId: number,
    from: string,
    to: string
  ): Promise<WorkMessage[]> {
    if (process.env.REALDATA) {
      return await Queries.getWorkMessages(workMessageId, userId, companyId, workEntryId, from, to);
    } else {
      // TODO mock data
      return null;
    }
  }
}

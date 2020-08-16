import { WorkEntry } from '../../models';
import { mockWorkEntries } from '../mockData';
import { Database } from './database.init';
import { Queries } from './database.queries';

export class WorkEntriesService {
  /**
   * Gets all work entries with given parameters `company / user`
   * @param companyId id of the company
   * @param userId id of the user
   */
  static async getWorkEntries(
    userId: number[],
    workEntryId: number,
    companyId: number,
    from: string,
    to: string
  ): Promise<WorkEntry[]> {
    if (process.env.REALDATA) {
      return await Queries.getWorkEntries(
        // userId ? [userId] : undefined,
        userId,
        workEntryId,
        companyId,
        from,
        to
      );
    } else {
      return mockWorkEntries;
    }
  }

  static async addWorkEntry(workEntry: WorkEntry): Promise<WorkEntry[]> {
    if (process.env.REALDATA) {
      return await Queries.addGenericEntry(workEntry, 'work_entries');
    } else {
      return [
        {
          ...workEntry,
          workEntryId: Math.floor(Math.random() * Math.floor(1000)) + 1,
        },
      ];
    }
  }

  static async editWorkEntry(workEntry: WorkEntry): Promise<WorkEntry[]> {
    if (process.env.REALDATA) {
      return await Queries.editGenericEntry(workEntry, 'work_entries', 'workEntryId', workEntry.workEntryId);
    } else {
      return [workEntry];
    }
  }

  static async deleteWorkEntry(workEntryId: number): Promise<WorkEntry[]> {
    if (process.env.REALDATA) {
      return await Queries.deleteGenericEntry<WorkEntry[]>('work_entries', 'workEntryId', workEntryId);
    } else {
      return [Object.assign({}, mockWorkEntries[0], { workEntryId })];
    }
  }
}

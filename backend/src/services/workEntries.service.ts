import { WorkEntry } from "../../../models";
import { mockWorkEntries } from "../mockData/workentries";
import { Database } from "./database.init";
import { Queries } from "./database.queries";

export class WorkEntriesService {
  /**
   * Gets all work entries with given parameters `company / user`
   * @param companyId id of the company
   * @param userId id of the user
   */
  static async getWorkEntries(
    userId: number,
    workEntryId: number,
    companyId: number,
    from: string,
    to: string
  ): Promise<WorkEntry[]> {
    if (process.env.INPROD) {
      // fetch from database with corrent params
      // console.log(companyId, userId);
      return await Queries.getWorkEntries(
        userId ? [userId] : undefined,
        workEntryId,
        companyId,
        from,
        to
      );
    } else {
      return mockWorkEntries;
    }
  }

  static async addWorkEntry(newEntry: WorkEntry) {
    // use service to add to database
    if (process.env.INPROD) {
      return await Queries.addGenericEntry(newEntry, "work_entries");
    } else {
      // Return added Mockentry of given parameted entry
    }
  }
}

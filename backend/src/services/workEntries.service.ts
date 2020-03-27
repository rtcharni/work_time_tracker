import { WorkEntry } from "../../../models";
import { mockWorkEntries } from "../mockData/workentries";

export class WorkEntriesService {
  /**
   * Gets all work entries with given parameters `company / user`
   * @param companyId id of the company
   * @param userId id of the user
   */
  static async getWorkEntries(
    companyId: number,
    userId: number,
    from: string,
    to: string
  ): Promise<WorkEntry[]> {
    if (process.env.INPROD) {
      // fetch from database with corrent params
      return [];
    } else {
      let entries: WorkEntry[] = companyId
        ? mockWorkEntries.filter(entry => entry.companyId === companyId)
        : mockWorkEntries;
      entries = userId
        ? entries.filter(entry => entry.userId === userId)
        : entries;
      return entries;
    }
  }

  static async addWorkEntry(newEntry: WorkEntry) {
    // use service to add to database
    return "null";
  }
}

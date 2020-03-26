import { WorkEntry } from "../../../models";

export class WorkEntriesService {
  static async getWorkEntries(
    companyId: number,
    userId: number
  ): Promise<WorkEntry[]> {
    if (process.env.INPROD) {
      console.log("in prod");
    } else {
      console.log("in dev");
    }

    return null;
  }
}

import { WorkEntry } from "../models";

export class Validation {
  /**
   * Validates given worn entry object
   * @param entry work entry to validate
   */
  static isWorkEntryValid(entry: WorkEntry) {
    if (entry.companyId === 0) return false;
    if (entry.userId === 0) return false;
    if (
      entry.startTime &&
      entry.endTime &&
      Date.parse(entry.endTime) <= Date.parse(entry.startTime)
    )
      return false;
    return true;
  }
}

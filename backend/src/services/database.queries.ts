import { User, WorkEntry, Company } from "../../../models";
import { Database } from "./database.init";

export class Queries {
  static async getUsers(
    usersIds: number[] = [],
    companyId?: number,
    withCompany?: boolean
  ): Promise<User[]> {
    if (withCompany) {
      return await Database.db
        .withSchema("work-time-tracker")
        .select()
        .from<User>("users")
        .where((builder) => {
          if (usersIds.length === 1) builder.where("userId", usersIds[0]);
          if (usersIds.length > 1) builder.whereIn("userId", usersIds);
          if (companyId) builder.where("companyId", companyId);
        })
        .join("companies", "users.companyId", "companies.companyId");
    } else {
      return await Database.db
        .withSchema("work-time-tracker")
        .select()
        .from<User>("users")
        .where((builder) => {
          if (usersIds.length === 1) builder.where("userId", usersIds[0]);
          if (usersIds.length > 1) builder.whereIn("userId", usersIds);
          if (companyId) builder.where("companyId", companyId);
        });
    }
  }

  static async getCompanies(companiesIds: number[] = []): Promise<Company[]> {
    return await Database.db
      .withSchema("work-time-tracker")
      .select()
      .from<Company>("companies")
      .where((builder) => {
        if (companiesIds.length === 1)
          builder.where("companyId", companiesIds[0]);
        if (companiesIds.length > 1) builder.whereIn("companyId", companiesIds);
      });
  }

  static async getWorkEntries(
    usersIds: number[] = [],
    workEntryId?: number,
    companyId?: number,
    from?: string,
    to?: string
  ): Promise<WorkEntry[]> {
    try {
      return await Database.db
        .withSchema("work-time-tracker")
        .select()
        .from<WorkEntry>("work_entries")
        .where((builder) => {
          if (workEntryId) builder.where("workEntryId", workEntryId);
          if (usersIds.length === 1) builder.where("userId", usersIds[0]);
          if (usersIds.length > 1) builder.whereIn("userId", usersIds);
          if (companyId) builder.where("companyId", companyId);
          if (from && to) builder.whereBetween("date", [from, to]);
        });
    } catch (error) {
      console.error(`Error while fetching work entries`);
      console.error(error);
    }
  }

  static async addGenericEntry<T>(entry: T, tableName: string): Promise<T[]> {
    try {
      return Database.db.transaction(async (trx) => {
        return (await trx
          .withSchema("work-time-tracker")
          .insert(entry, "*")
          .into(tableName)) as T[];
      });
    } catch (error) {
      console.error(
        `Error while adding generic entry to table ${tableName}.`,
        entry
      );
      console.error(error);
    }
  }

  static async editGenericEntry<T>(
    entry: T,
    tableName: string,
    idColumnName: string,
    id: number
  ): Promise<T[]> {
    try {
      return Database.db.transaction(async (trx) => {
        return (await trx
          .withSchema("work-time-tracker")
          .where(idColumnName, id)
          .update(entry, "*")
          .into(tableName)) as T[];
      });
    } catch (error) {
      console.error(
        `Error while editing generic entry at table ${tableName}, id ${id}, id-column ${idColumnName}.`,
        entry
      );
      console.error(error);
    }
  }

  static async deleteGenericEntry<T>(
    tableName: string,
    idColumnName: string,
    id: number
  ): Promise<T> {
    try {
      return Database.db.transaction(async (trx) => {
        return ((await trx
          .withSchema("work-time-tracker")
          .from(tableName)
          .where(idColumnName, id)
          .del("*")) as unknown) as T;
      });
    } catch (error) {
      console.error(
        `Error while deleting generic entry at table ${tableName}, id ${id}, id-column ${idColumnName}.`
      );
      console.error(error);
    }
  }
}

import { User, WorkEntry, Company, UserAndCompany, WorkMessage } from '@models';
import { Database } from './database.init';
import { BackendUtils } from '../backendUtils';

export class Queries {
  static async getUsers(usersIds: number[] = [], companyId?: number, withCompany?: boolean): Promise<User[] | UserAndCompany[]> {
    if (withCompany) {
      return (await Database.db
        .withSchema('work-time-tracker')
        .select()
        .from<User>('users')
        .where(builder => {
          if (usersIds.length === 1) builder.where('userId', usersIds[0]);
          if (usersIds.length > 1) builder.whereIn('userId', usersIds);
          if (companyId) builder.where('companyId', companyId);
        })
        .join('companies', 'users.companyId', 'companies.companyId')) as UserAndCompany[];
    } else {
      return (await Database.db
        .withSchema('work-time-tracker')
        .select()
        .from<User>('users')
        .where(builder => {
          if (usersIds.length === 1) builder.where('userId', usersIds[0]);
          if (usersIds.length > 1) builder.whereIn('userId', usersIds);
          if (companyId) builder.where('companyId', companyId);
        })) as User[];
    }
  }

  static async getCompanies(companiesIds: number[] = []): Promise<Company[]> {
    return await Database.db
      .withSchema('work-time-tracker')
      .select()
      .from<Company>('companies')
      .where(builder => {
        if (companiesIds.length === 1) builder.where('companyId', companiesIds[0]);
        if (companiesIds.length > 1) builder.whereIn('companyId', companiesIds);
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
        .withSchema('work-time-tracker')
        .select()
        .from<WorkEntry>('work_entries')
        .where(builder => {
          if (workEntryId) builder.where('workEntryId', workEntryId);
          if (usersIds.length === 1) builder.where('userId', usersIds[0]);
          if (usersIds.length > 1) builder.whereIn('userId', usersIds);
          if (companyId) builder.where('companyId', companyId);
          if (from && to) builder.whereBetween('date', [from, to]);
        });
    } catch (error) {
      console.error(`Error while fetching work entries`);
      console.error(error);
    }
  }

  static async addGenericEntry<T>(entry: T, tableName: string): Promise<T[]> {
    const cleanedEntry = BackendUtils.convertObjectEmptyStringPropsToNull(entry);

    try {
      return Database.db.transaction(async trx => {
        return (await trx.withSchema('work-time-tracker').insert(cleanedEntry, '*').into(tableName)) as T[];
      });
    } catch (error) {
      console.error(`Error while adding generic entry to table ${tableName}.`, cleanedEntry);
      console.error(error);
    }
  }

  static async editGenericEntry<T>(entry: T, tableName: string, idColumnName: string, id: number): Promise<T[]> {
    try {
      return Database.db.transaction(async trx => {
        return (
          (await trx
            .withSchema('work-time-tracker')
            // .where(idColumnName, id)
            .where(builder => {
              builder.where(idColumnName, id);
              // check that work entry is not locked
              if (tableName === 'work_entries') builder.where('locked', false);
            })
            .update(entry, '*')
            .into(tableName)) as T[]
        );
      });
    } catch (error) {
      console.error(`Error while editing generic entry at table ${tableName}, id ${id}, id-column ${idColumnName}.`, entry);
      console.error(error);
    }
  }

  static async editGenericFields(
    fields: string[],
    values: any[],
    tableName: string,
    idColumnName: string,
    id: number,
    returnFields?: string[]
  ): Promise<any[]> {
    const updateObject = Object.fromEntries(fields.map((_, i) => [fields[i], values[i]]));
    try {
      return Database.db.transaction(async trx => {
        return await trx
          .withSchema('work-time-tracker')
          .where(builder => {
            builder.where(idColumnName, id);
            // check that work entry is not locked
            if (tableName === 'work_entries') builder.where('locked', false);
          })
          .update(updateObject, returnFields ? returnFields : '*')
          .into(tableName);
      });
    } catch (error) {
      console.error(
        `Error while editing generic fields at table ${tableName}, id ${id}, id-column ${idColumnName}, and update object: `,
        updateObject
      );
      console.error(error);
    }
  }

  static async deleteGenericEntry<T>(tableName: string, idColumnName: string, id: number): Promise<T> {
    try {
      return Database.db.transaction(async trx => {
        return (
          ((await trx
            .withSchema('work-time-tracker')
            .from(tableName)
            // .where(idColumnName, id)
            .where(builder => {
              builder.where(idColumnName, id);
              // check that work entry is not locked
              if (tableName === 'work_entries') builder.where('locked', false);
            })
            .del('*')) as unknown) as T
        );
      });
    } catch (error) {
      console.error(`Error while deleting generic entry at table ${tableName}, id ${id}, id-column ${idColumnName}.`);
      console.error(error);
    }
  }

  static async addUserPasswordResetToken(user: User, token: string): Promise<string[]> {
    try {
      return Database.db.transaction(async trx => {
        return await trx
          .withSchema('work-time-tracker')
          .where(builder => {
            builder.where('userId', user.userId);
          })
          .update('resetPasswordToken', token, 'resetPasswordToken');
      });
    } catch (error) {
      console.error(`Error while adding user password reset token to user with ID: ${user.userId} and Token: ${token}`);
      console.error(error);
    }
  }

  static async getWorkMessages(
    workMessageId: number,
    userId: number,
    companyId: number,
    workEntryId: number,
    from: string,
    to: string
  ): Promise<WorkMessage[]> {
    try {
      return await Database.db
        .withSchema('work-time-tracker')
        .select()
        .from<WorkMessage>('work_messages')
        .where(builder => {
          if (workMessageId) builder.where('workMessageId', workMessageId);
          if (userId) builder.where('userId', userId);
          if (companyId) builder.where('companyId', companyId);
          if (workEntryId) builder.where('workEntryId', workEntryId);
          if (from && to) builder.whereBetween('createdAt', [from, to]);
        });
    } catch (error) {
      console.error(`Error while fetching work messages`);
      console.error(error);
    }
  }
}

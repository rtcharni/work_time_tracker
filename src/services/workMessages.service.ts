import { WorkMessage, WorkMessageAndUser } from '@models';
import { Queries } from './database.queries';

export class WorkMessagesService {
  static async getWorkMessages(
    workMessageId: number,
    userId: number,
    companyId: number,
    workEntryId: number,
    from: string,
    to: string,
    joinusers: boolean
  ): Promise<WorkMessage[]> {
    if (process.env.REALDATA) {
      let workMessages = await Queries.getWorkMessages(workMessageId, userId, companyId, workEntryId, from, to, joinusers);
      if (joinusers) {
        workMessages = WorkMessagesService.clearSensitiveUserDataFromMessages(workMessages as WorkMessageAndUser[]);
      }
      return workMessages;
    } else {
      // TODO mock data
      return null;
    }
  }

  static async addWorkMessage(
    workMessage: string,
    userId: number,
    companyId: number,
    workEntryId: number
  ): Promise<WorkMessage[]> {
    if (process.env.REALDATA) {
      return await Queries.addGenericEntry({ workMessage, userId, companyId, workEntryId } as WorkMessage, 'work_messages');
    } else {
      return [
        {
          workMessage,
          userId,
          companyId,
          workEntryId,
          createdAt: new Date().toISOString(),
          workMessageId: Math.floor(Math.random() * Math.floor(1000)) + 1,
        },
      ];
    }
  }

  static async editWorkMessage(workMessageId: number, workMessage: string): Promise<WorkMessage[]> {
    if (process.env.REALDATA) {
      return await Queries.editGenericFields(['workMessage'], [workMessage], 'work_messages', 'workMessageId', workMessageId);
    } else {
      return [
        // TODO!
        // {
        // mock work message with new message text
        // },
      ];
    }
  }

  static async deleteWorkMessage(workMessageId: number): Promise<WorkMessage[]> {
    if (process.env.REALDATA) {
      return await Queries.deleteGenericEntry('work_messages', 'workMessageId', workMessageId);
    } else {
      return [
        // TODO!
        // {
        //  mock work entry
        // },
      ];
    }
  }

  static clearSensitiveUserDataFromMessages(workMessages: WorkMessageAndUser[]): WorkMessageAndUser[] {
    for (const message of workMessages) {
      delete message.admin;
      delete message.email;
      delete message.password;
      delete message.resetPasswordToken;
      delete message.userId;
    }
    return workMessages;
  }
}

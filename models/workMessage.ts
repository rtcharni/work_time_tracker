import { User } from '@models';

export interface WorkMessage {
  workMessageId?: number | undefined; // PK
  userId: number; // FK
  companyId: number; // FK
  workEntryId: number; // FK
  workMessage: string;
  createdAt?: string | undefined;
}

export type WorkMessageAndUser = WorkMessage & User;

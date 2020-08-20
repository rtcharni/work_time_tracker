export interface WorkMessage {
  workMessageId?: number | undefined; // PK
  userId: number; // FK
  companyId: number; // FK
  workEntryId: number; // FK
  workMessage: string;
  createdAt?: string | undefined;
}

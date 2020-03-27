export interface WorkEntry {
  workEntryId: number | undefined; // PK
  companyId: number; // FK
  userId: number; // FK
  title: string;
  details: string;
  customerName: string;
  startTime: string;
  endTime: string;
  breakMIN: number;
}

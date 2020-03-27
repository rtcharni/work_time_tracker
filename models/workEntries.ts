export interface WorkEntry {
  workEntryId: number | undefined;
  companyId: number;
  userId: number;
  title: string;
  details: string;
  customerName: string;
  startTime: string;
  endTime: string;
  breakMIN: number;
}

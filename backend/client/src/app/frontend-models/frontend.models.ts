import { WorkEntry, UserAndCompany } from '../../../../../models';

export interface BottomSheetActionResult {
  action: 'addComment' | 'deleteEntry' | 'editEntry';
  comment?: string;
  workEntry?: WorkEntry;
}

export interface BottomSheetAndDialogData {
  workEntry: WorkEntry;
  workFormFields: string[];
  userAndCompany: UserAndCompany;
}

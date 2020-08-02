import { WorkEntry, UserAndCompany, User } from '../../../../models';

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

export interface UserFormEvent {
  user: User | UserAndCompany;
  action: 'create' | 'edit' | 'delete';
}

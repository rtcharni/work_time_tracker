import { WorkEntry } from '../../../../../models';

export interface BottomSheetActionResult {
  action: 'addComment' | 'deleteEntry' | 'editEntry';
  comment?: string;
  workEntry?: WorkEntry;
}

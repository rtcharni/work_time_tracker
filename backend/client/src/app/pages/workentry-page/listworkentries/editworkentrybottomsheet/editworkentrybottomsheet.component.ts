import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomSheetActionResult } from '../../../../frontend-models/frontend.models';
import { WorkEntry } from '../../../../../../../../models';
import { WorkEntryService } from 'src/app/services/workentry.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editworkentrybottomsheet',
  templateUrl: './editworkentrybottomsheet.component.html',
  styleUrls: ['./editworkentrybottomsheet.component.css'],
})
export class EditworkentrybottomsheetComponent implements OnInit {
  comment = '';
  showComment = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<
      EditworkentrybottomsheetComponent
    >,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: WorkEntry,
    private workEntryService: WorkEntryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onOptionClick(action: string): void {
    if (action === 'addComment') {
      this.showComment = true;
    } else if (action === 'deleteEntry') {
      // Show alert or simillar??
      this.deleteEntry(this.data);
    } else if (action === 'editEntry') {
      //
    }
    // this.bottomSheetRef.dismiss(action);
  }

  async saveComment(comment: string): Promise<void> {
    console.log(`SAving comment: `, comment);
    this.data.comments
      ? this.data.comments.push(`${new Date().toISOString()};${comment}`)
      : (this.data.comments = [`${new Date().toISOString()};${comment}`]);
    const res = await this.workEntryService.editWorkEntry(this.data);
    const actionResult: BottomSheetActionResult = {
      action: 'addComment',
      comment,
    };
    this.bottomSheetRef.dismiss(actionResult);
  }

  async deleteEntry(workEntry: WorkEntry): Promise<void> {
    const res = await this.workEntryService.deleteWorkEntry(
      workEntry.workEntryId
    );
    const actionResult: BottomSheetActionResult = {
      action: 'deleteEntry',
      workEntry: res,
    };
    this.bottomSheetRef.dismiss(actionResult);
  }
}

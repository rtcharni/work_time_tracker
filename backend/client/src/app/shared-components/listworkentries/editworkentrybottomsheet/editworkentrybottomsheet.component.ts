import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {
  BottomSheetActionResult,
  BottomSheetAndDialogData,
} from '../../../frontend-models/frontend.models';
import { WorkEntry } from '../../../../../../../models';
import { WorkEntryService } from 'src/app/services/workentry.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditworkentryformComponent } from '../editworkentryform/editworkentryform.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetAndDialogData,
    private workEntryService: WorkEntryService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async onOptionClick(action: string): Promise<void> {
    if (action === 'addComment') {
      this.showComment = true;
    } else if (action === 'deleteEntry') {
      if (confirm(`Delete entry with title - ${this.data.workEntry.title} ?`)) {
        const actionResult = await this.deleteEntry(this.data.workEntry);
        if (actionResult.workEntry) {
          this.snackBar.open('Entry deleted!', undefined, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }

        this.bottomSheetRef.dismiss(actionResult);
      }
    } else if (action === 'editEntry') {
      this.dialog
        .open(EditworkentryformComponent, {
          data: this.data,
        })
        .afterClosed()
        .subscribe((res: WorkEntry) => {
          const actionResult: BottomSheetActionResult = {
            action: 'editEntry',
            workEntry: res,
          };
          if (actionResult.workEntry) {
            this.snackBar.open('Entry edited!', undefined, {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
          this.bottomSheetRef.dismiss(actionResult);
        });
    }
    // this.bottomSheetRef.dismiss(action);
  }

  async saveComment(comment: string): Promise<void> {
    console.log(`SAving comment: `, comment);
    const name = `${this.data.userAndCompany.lastName} ${this.data.userAndCompany.firstName} (${this.data.userAndCompany.name})`;
    this.data.workEntry.comments
      ? this.data.workEntry.comments.push(
          `${new Date().toISOString()};${name};${comment}`
        )
      : (this.data.workEntry.comments = [
          `${new Date().toISOString()};${name};${comment}`,
        ]);
    const res = await this.workEntryService.editWorkEntry(this.data.workEntry);
    const actionResult: BottomSheetActionResult = {
      action: 'addComment',
      comment,
    };
    this.bottomSheetRef.dismiss(actionResult);
  }

  async deleteEntry(workEntry: WorkEntry): Promise<BottomSheetActionResult> {
    const res = await this.workEntryService.deleteWorkEntry(
      workEntry.workEntryId
    );
    const actionResult: BottomSheetActionResult = {
      action: 'deleteEntry',
      workEntry: res,
    };
    return actionResult;
  }

  containsIllegalCharacter(text: string): boolean {
    return text.includes(';');
  }
}

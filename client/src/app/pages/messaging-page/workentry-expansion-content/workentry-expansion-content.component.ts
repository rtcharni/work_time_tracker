import { Component, OnInit, Input } from '@angular/core';
import { WorkEntry, WorkMessage, UserAndCompany } from '@models';
import { WorkMessageService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workentry-expansion-content',
  templateUrl: './workentry-expansion-content.component.html',
  styleUrls: ['./workentry-expansion-content.component.css'],
})
export class WorkentryExpansionContentComponent implements OnInit {
  @Input() workEntry: WorkEntry;
  @Input() user: UserAndCompany;
  workMessages: WorkMessage[] = [];
  messageText = '';

  constructor(private workMessageService: WorkMessageService, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    console.log('panel opened and got content', this.workEntry);
    this.workMessages = await this.getWorkMessages(this.workEntry.workEntryId);
    console.log('Got work messages!', this.workMessages);
  }

  async getWorkMessages(workEntryId: number) {
    const workMessages = await this.workMessageService.getWorkMessages(null, null, null, workEntryId, null, null);
    return workMessages;
  }

  async handleSendMessageClick() {
    if (this.messageText.length) {
      const res = await this.workMessageService.addWorkMessage({
        userId: this.user.userId,
        companyId: this.user.companyId,
        workEntryId: this.workEntry.workEntryId,
        workMessage: this.messageText,
      });
      if (res) {
        this.workMessages.push(res);
      }
      this.messageText = '';
    } else {
      this.snackBar.open(`Please enter some meaningfull message`, undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
}

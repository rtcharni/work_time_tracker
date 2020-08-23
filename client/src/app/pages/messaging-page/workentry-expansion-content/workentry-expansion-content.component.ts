import { Component, OnInit, Input } from '@angular/core';
import { WorkEntry, UserAndCompany, WorkMessageAndUser } from '@models';
import { WorkMessageService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Constants } from '../../../../../../utils';

@Component({
  selector: 'app-workentry-expansion-content',
  templateUrl: './workentry-expansion-content.component.html',
  styleUrls: ['./workentry-expansion-content.component.css'],
})
export class WorkentryExpansionContentComponent implements OnInit {
  @Input() workEntry: WorkEntry;
  @Input() user: UserAndCompany;

  workMessages: WorkMessageAndUser[] = [];
  messageText = '';

  showEnterMessageInputOnTop = false;

  constructor(private workMessageService: WorkMessageService, private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    console.log('panel opened and got content', this.workEntry);
    this.workMessages = await this.getWorkMessages(this.workEntry.workEntryId);
    console.log('Got work messages!', this.workMessages);
  }

  async getWorkMessages(workEntryId: number): Promise<WorkMessageAndUser[]> {
    const workMessages = (await this.workMessageService.getWorkMessages(
      null,
      null,
      null,
      workEntryId,
      null,
      null,
      true
    )) as WorkMessageAndUser[];
    return workMessages;
  }

  async handleSendMessageClick(): Promise<void> {
    if (this.messageText.length) {
      const res = await this.workMessageService.addWorkMessage({
        userId: this.user.userId,
        companyId: this.user.companyId,
        workEntryId: this.workEntry.workEntryId,
        workMessage: this.messageText,
      });
      if (res) {
        const newMessage: any = { ...res, firstName: this.user.firstName, lastName: this.user.lastName };
        this.showEnterMessageInputOnTop ? this.workMessages.unshift(newMessage) : this.workMessages.push(newMessage);
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

  swapMessagesViewOrder(): void {
    this.workMessages.reverse();
    this.showEnterMessageInputOnTop = !this.showEnterMessageInputOnTop;
  }

  formatMessageCreatedAt(createdAt: string): string {
    return moment(createdAt).format(Constants.DATEANDTIMEFORMAT);
  }
}

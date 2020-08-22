import { Component, OnInit } from '@angular/core';
import { WorkEntryService, UserService } from '@services';
import { UserAndCompany, WorkEntry } from '@models';

@Component({
  selector: 'app-workmessages-tab',
  templateUrl: './workmessages-tab.component.html',
  styleUrls: ['./workmessages-tab.component.css'],
})
export class WorkmessagesTabComponent implements OnInit {
  user: UserAndCompany;
  workEntries: WorkEntry[] = [];

  constructor(private userService: UserService, private workEntryService: WorkEntryService) {}

  async ngOnInit() {
    this.user = this.userService.getUser();
    this.workEntries = await this.getWorkEntries();
  }

  async getWorkEntries() {
    const workEntries = await this.workEntryService.getWorkEntries(
      [this.user.userId],
      null,
      this.user.companyId,
      '2020-01-01T10:00:00.000Z',
      '2020-09-01T10:00:00.000Z'
    );
    return workEntries;
  }
}

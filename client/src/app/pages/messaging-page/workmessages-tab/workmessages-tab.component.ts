import { Component, OnInit } from '@angular/core';
import { WorkEntryService, UserService } from '@services';
import { UserAndCompany, WorkEntry } from '@models';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-workmessages-tab',
  templateUrl: './workmessages-tab.component.html',
  styleUrls: ['./workmessages-tab.component.css'],
})
export class WorkmessagesTabComponent implements OnInit {
  user: UserAndCompany;
  workEntries: WorkEntry[] = [];

  // 2 months by default
  startDate: Date = moment()
    .month(moment().month() - 2)
    .toDate();
  endDate: Date = new Date();

  constructor(private userService: UserService, private workEntryService: WorkEntryService) {}

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    this.workEntries = await this.getWorkEntries(this.startDate, this.endDate);
  }

  async getWorkEntries(startDate: Date, endDate: Date): Promise<WorkEntry[]> {
    const workEntries = await this.workEntryService.getWorkEntries(
      null,
      null,
      this.user.companyId,
      startDate.toISOString(),
      endDate.toISOString()
    );
    return workEntries;
  }

  async handleDateChange(startOrEnd: 'start' | 'end', event: MatDatepickerInputEvent<Date>): Promise<void> {
    this.startDate = startOrEnd === 'start' ? event.value : this.startDate;
    this.endDate = startOrEnd === 'end' ? event.value : this.endDate;
    if (startOrEnd === 'end' && this.startDate && this.endDate) {
      this.workEntries = await this.getWorkEntries(this.startDate, this.endDate);
    }
  }
}

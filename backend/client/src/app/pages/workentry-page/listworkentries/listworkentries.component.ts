import { Component, OnInit } from '@angular/core';
import { UserAndCompany } from '../../../../../../../models/user';
import { UserService } from '../../../services/user.service';
import { WorkEntryService } from '../../../services/workentry.service';
import { WorkEntry } from '../../../../../../../models';

@Component({
  selector: 'app-listworkentries',
  templateUrl: './listworkentries.component.html',
  styleUrls: ['./listworkentries.component.css'],
})
export class ListworkentriesComponent implements OnInit {
  private user: UserAndCompany = null;
  workEntries: WorkEntry[] = [];

  constructor(
    private userService: UserService,
    private workEntryService: WorkEntryService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    if (this.user?.userId) {
      this.workEntries = await this.getWorkEntries(this.user.userId);
    }
  }

  async getWorkEntries(
    userId: number,
    from?: string,
    to?: string
  ): Promise<WorkEntry[]> {
    const workEntries = await this.workEntryService.getWorkEntry(
      userId,
      undefined,
      this.user.companyId,
      from,
      to
    );
    console.log(workEntries);
    return workEntries;
  }
}

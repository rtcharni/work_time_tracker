import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkEntryService } from '../../../services/workentry.service';
import { WorkEntry, UserAndCompany } from '../../../../../../../models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addworkentry',
  templateUrl: './addworkentry.component.html',
  styleUrls: ['./addworkentry.component.css'],
})
export class AddworkentryComponent implements OnInit {
  private user: UserAndCompany = null;
  addWorkEntryForm = new FormGroup({
    title: new FormControl(''),
    details: new FormControl(''),
    customerName: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    breakMIN: new FormControl(null),
    charged: new FormControl(null),
  });

  constructor(
    private workEntryService: WorkEntryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(`add work entry IN INIT`);
  }

  async handleSaveButtonClick(): Promise<void> {
    console.log(`Saving...`, this.addWorkEntryForm.value);
    // TODO validation
    const workEntry: WorkEntry = {
      ...this.addWorkEntryForm.value,
      userId: this.user.userId,
      companyId: this.user.companyId,
    };
    const res = await this.workEntryService.addWorkEntry(workEntry);
    console.log(`Result`, res);
  }

  handleClearButtonClick(): void {
    this.addWorkEntryForm.reset();
  }
}

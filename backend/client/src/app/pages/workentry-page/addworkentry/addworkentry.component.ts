import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  // addWorkEntryForm: FormGroup;
  addWorkEntryForm = new FormGroup({
    title: new FormControl(''),
    details: new FormControl(''),
    customerName: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    breakMIN: new FormControl(null, [
      Validators.min(0),
      Validators.max(1000),
      Validators.pattern('[0-9]*'),
    ]),
    charged: new FormControl(null),
  });

  constructor(
    private workEntryService: WorkEntryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(`add work entry IN INIT`);
    this.user = this.userService.getUser();
    // this.addWorkEntryForm = this.initForm(this.user);
  }

  initForm(user: UserAndCompany): FormGroup {
    const form = new FormGroup({});
    for (const field of user.config.workEntryFields) {
      switch (field) {
        case 'title':
          form.addControl('title', new FormControl(null));
          break;
        case 'details':
          form.addControl('details', new FormControl(null));
          break;
        case 'customerName':
          form.addControl('customerName', new FormControl(null));
          break;
        case 'date':
          form.addControl('date', new FormControl(null));
          break;
        case 'startTime':
          form.addControl('startTime', new FormControl(null));
          break;
        case 'endTime':
          form.addControl('endTime', new FormControl(null));
          break;
        case 'breakMIN':
          form.addControl('breakMIN', new FormControl(null));
          break;
        case 'charged':
          form.addControl('charged', new FormControl(null));
          break;
      }
    }
    return form;
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

  showFormField(fieldName: string): boolean {
    return true; // REMOVE
    return this.user.config.workEntryFields.includes(fieldName);
  }

  handleClearButtonClick(): void {
    this.addWorkEntryForm.reset();
  }
}

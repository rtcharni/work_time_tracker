import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkEntryService } from '../../../services/workentry.service';
import { WorkEntry, UserAndCompany } from '../../../../../../../models';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { Utils } from '../../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addworkentry',
  templateUrl: './addworkentry.component.html',
  styleUrls: ['./addworkentry.component.css'],
})
export class AddworkentryComponent implements OnInit {
  private user: UserAndCompany = null;
  addWorkEntryForm: FormGroup = null;

  constructor(
    private workEntryService: WorkEntryService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(`add work entry IN INIT`);
    this.user = this.userService.getUser();
    this.addWorkEntryForm = this.initForm(this.user);
    // this.addWorkEntryForm.valueChanges.subscribe((res) => console.log(res));
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
        case 'costCents':
          form.addControl(
            'costCents',
            new FormControl(null, [Validators.pattern('^\\d+,{0,1}\\d{0,2}$')])
          );
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
          form.addControl(
            'breakMIN',
            new FormControl(null, [
              Validators.min(0),
              Validators.max(1000),
              Validators.pattern('[0-9]*'),
            ])
          );
          break;
        case 'charged':
          form.addControl('charged', new FormControl(null));
          break;
      }
    }

    if (
      user.config.workEntryFields.includes('startTime') &&
      user.config.workEntryFields.includes('endTime')
    ) {
      form.setValidators(Utils.startAndEndtimeValidator());
    }
    return form;
  }

  async handleSaveButtonClick(): Promise<void> {
    const values = this.addWorkEntryForm.value;
    console.log(`Saving...`, values);

    if (this.addWorkEntryForm.valid) {
      const workEntry: WorkEntry = this.convertToWorkEntry(
        values,
        this.user.userId,
        this.user.companyId
      );
      console.log(workEntry);
      const res = await this.workEntryService.addWorkEntry(workEntry);
      if (res) {
        // success
        this.snackBar.open('New entry added!', undefined, {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.addWorkEntryForm.reset();
      } else {
        // error
      }
      console.log(`Result`, res);
    } else {
      alert('Form not valid');
    }
  }

  showFormField(fieldName: string): boolean {
    // return true; // REMOVE
    return this.user.config.workEntryFields.includes(fieldName);
  }

  convertToWorkEntry(
    formValues: any,
    userId: number,
    companyId: number
  ): WorkEntry {
    const workEntry: WorkEntry = {
      ...formValues,
      userId,
      companyId,
    };

    if (formValues.date) {
      workEntry.date = moment(formValues.date).add(12, 'hour').toISOString();
    }
    if (formValues.startTime) {
      const time = formValues.startTime.split(':');
      if (formValues.date) {
        workEntry.startTime = moment(formValues.date)
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      } else {
        workEntry.startTime = moment()
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      }
    }

    if (formValues.endTime) {
      const time = formValues.endTime.split(':');
      if (formValues.date) {
        workEntry.endTime = moment(formValues.date)
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      } else {
        workEntry.endTime = moment()
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      }
    }

    if (formValues.costCents) {
      const noComma: number = (formValues.costCents as string).includes(',')
        ? +(formValues.costCents as string).replace(',', '.')
        : +formValues.costCents;
      workEntry.costCents = noComma * 100;
    }

    return workEntry;
  }

  handleClearButtonClick(): void {
    this.addWorkEntryForm.reset();
  }
}

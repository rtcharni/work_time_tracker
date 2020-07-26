import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WorkEntry, UserAndCompany } from '../../../../../../../../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkEntryService } from 'src/app/services/workentry.service';
import { UserService } from 'src/app/services/user.service';
import { BottomSheetAndDialogData } from 'src/app/frontend-models/frontend.models';
import * as moment from 'moment';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-editworkentryform',
  templateUrl: './editworkentryform.component.html',
  styleUrls: ['./editworkentryform.component.css'],
})
export class EditworkentryformComponent implements OnInit {
  editWorkEntryForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: BottomSheetAndDialogData,
    public dialogRef: MatDialogRef<EditworkentryformComponent>,
    private workEntryService: WorkEntryService
  ) {}

  ngOnInit(): void {
    this.editWorkEntryForm = this.initForm(
      this.dialogData.workFormFields,
      this.dialogData.workEntry
    );
  }

  initForm(workEntryFields: string[], workEntry: WorkEntry): FormGroup {
    const form = new FormGroup({});
    for (const field of workEntryFields) {
      switch (field) {
        case 'title':
          form.addControl('title', new FormControl(workEntry.title || null));
          break;
        case 'details':
          form.addControl(
            'details',
            new FormControl(workEntry.details || null)
          );
          break;
        case 'customerName':
          form.addControl(
            'customerName',
            new FormControl(workEntry.customerName || null)
          );
          break;
        case 'costCents':
          form.addControl(
            'costCents',
            new FormControl(
              workEntry.costCents
                ? (workEntry.costCents / 100).toString().replace('.', ',')
                : null,
              [Validators.pattern('^\\d+,{0,1}\\d{0,2}$')]
            )
          );
          break;
        case 'date':
          form.addControl('date', new FormControl(workEntry.date || null));
          break;
        case 'startTime':
          let startTimeValue: string = null;
          if (workEntry.startTime) {
            startTimeValue = Utils.convertDateToHH_MM(workEntry.startTime);
          }
          form.addControl('startTime', new FormControl(startTimeValue));
          break;
        case 'endTime':
          let endTimeValue: string = null;
          if (workEntry.endTime) {
            endTimeValue = Utils.convertDateToHH_MM(workEntry.endTime);
          }
          form.addControl('endTime', new FormControl(endTimeValue));
          break;
        case 'breakMIN':
          form.addControl(
            'breakMIN',
            new FormControl(workEntry.breakMIN || null, [
              Validators.min(0),
              Validators.max(1000),
              Validators.pattern('[0-9]*'),
            ])
          );
          break;
        case 'charged':
          form.addControl(
            'charged',
            new FormControl(workEntry.charged || null)
          );
          break;
      }
    }

    if (
      workEntryFields.includes('startTime') &&
      workEntryFields.includes('endTime')
    ) {
      form.setValidators(Utils.startAndEndtimeValidator());
    }
    return form;
  }

  async handleSaveButtonClick(): Promise<void> {
    const values = this.editWorkEntryForm.value;
    console.log(`Saving...`, values);
    // TODO validation. empty fields...? required..?
    if (this.editWorkEntryForm.valid) {
      const workEntry: WorkEntry = this.convertToWorkEntry(values);
      console.log(`Final workentry to save: `, workEntry);
      const res = await this.workEntryService.editWorkEntry(workEntry);
      if (res) {
        Object.assign(this.dialogData.workEntry, res);
        this.dialogRef.close(res);
        // success
      } else {
        this.dialogRef.close(res);
        // error
      }
      console.log(`Result`, res);
    } else {
      alert('Form not valid');
    }
  }

  showFormField(fieldName: string): boolean {
    return this.dialogData?.workFormFields?.includes(fieldName);
  }

  convertToWorkEntry(formValues: any): WorkEntry {
    const tempWorkEntry: WorkEntry = Object.assign(
      {},
      this.dialogData.workEntry,
      formValues
    );

    if (formValues.date) {
      tempWorkEntry.date = moment(formValues.date)
        .add(12, 'hour')
        .toISOString();
    }

    if (formValues.startTime) {
      const time = formValues.startTime.split(':');
      if (formValues.date) {
        tempWorkEntry.startTime = moment(formValues.date)
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      } else {
        tempWorkEntry.startTime = moment()
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      }
    }

    if (formValues.endTime) {
      const time = formValues.endTime.split(':');
      if (formValues.date) {
        tempWorkEntry.endTime = moment(formValues.date)
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      } else {
        tempWorkEntry.endTime = moment()
          .set({ hour: time[0], minute: time[1], second: 0, millisecond: 0 })
          .toISOString();
      }
    }

    if (formValues.costCents) {
      const noComma: number = (formValues.costCents as string).includes(',')
        ? +(formValues.costCents as string).replace(',', '.')
        : +formValues.costCents;
      tempWorkEntry.costCents = noComma * 100;
    }

    return tempWorkEntry;
  }

  handleClearButtonClick(): void {
    this.editWorkEntryForm = this.initForm(
      this.dialogData.workFormFields,
      this.dialogData.workEntry
    );
  }
}

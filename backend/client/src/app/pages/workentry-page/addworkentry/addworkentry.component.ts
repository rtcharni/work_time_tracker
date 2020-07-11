import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkEntryService } from '../../../services/workentry.service';

@Component({
  selector: 'app-addworkentry',
  templateUrl: './addworkentry.component.html',
  styleUrls: ['./addworkentry.component.css'],
})
export class AddworkentryComponent implements OnInit {
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

  constructor(private workEntryService: WorkEntryService) {}

  ngOnInit(): void {}

  async handleSaveButtonClick(): Promise<void> {
    console.log(this.addWorkEntryForm.value);
    // TODO validation
    const res = await this.workEntryService.addWorkEntry({
      ...this.addWorkEntryForm.value,
    });
  }

  handleClearButtonClick(): void {
    this.addWorkEntryForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { WorkEntry, UserAndCompany } from '../../../../../../models';
import { WorkEntryService } from 'src/app/services/workentry.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  user: UserAndCompany;
  constructor(
    private workEntryService: WorkEntryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}

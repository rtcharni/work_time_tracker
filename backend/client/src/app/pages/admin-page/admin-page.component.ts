import { Component, OnInit } from '@angular/core';
import { WorkEntry, UserAndCompany, User } from '../../../../../../models';
import { WorkEntryService } from 'src/app/services/workentry.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  user: UserAndCompany;
  allUsers: User[] = [];

  tempUserIds: number[];
  allUsersIds: number[];

  mock: User = {
    userId: undefined,
    companyId: 1,
    email: null,
    firstName: null,
    lastName: null,
    admin: false,
    password: null,
  };

  constructor(
    private workEntryService: WorkEntryService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    this.allUsers = await this.userService.getCompanysAllUsers();
  }

  receiveSavedUser($event: User): any {}

  onSelectionChange(selectedUserIds: number[]): void {
    console.log(selectedUserIds);
    this.tempUserIds = selectedUserIds;
  }

  handleApplyButton(): void {
    if (this.tempUserIds?.includes(-1)) {
      this.allUsersIds = this.allUsers.map((user) => user.userId);
    } else {
      this.allUsersIds = this.tempUserIds;
    }
  }
}

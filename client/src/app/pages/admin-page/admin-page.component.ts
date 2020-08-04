import { Component, OnInit } from '@angular/core';
import { UserAndCompany, User } from '../../../../../models';
import { WorkEntryService } from 'src/app/services/workentry.service';
import { UserService } from 'src/app/services/user.service';
import { UserFormEvent } from 'src/app/frontend-models/frontend.models';
import { MatTabChangeEvent } from '@angular/material/tabs';

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

  emptyUser: User = {
    userId: undefined,
    companyId: undefined,
    firstName: null,
    lastName: null,
    email: null,
    admin: false,
    password: null,
    resetPasswordToken: null,
  };
  selectedUserProfile: User;

  constructor(
    private workEntryService: WorkEntryService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    this.emptyUser.companyId = this.user.companyId;
    this.allUsers = await this.userService.getCompanysAllUsers();
  }

  selectedTabChange($event: MatTabChangeEvent): void {
    if ($event.index === 0) {
      // tab changed to User profile tab. Do something if needed
    } else if ($event.index === 1) {
      // tab changed to Users work entries tab
      this.selectedUserProfile = undefined;
    }
  }

  async receiveUserFormEvent(event: UserFormEvent): Promise<any> {
    // IMPLEMENT HERE!!!!
    console.log(event);
    if (event.action === 'create') {
      // create user
    } else if (event.action === 'edit') {
      // edit user
      if (
        this.user.userId !== event.user.userId ||
        this.user.password === event.user.password
      ) {
        delete event.user.password;
      }
      delete event.user.companyId;
      delete event.user.resetPasswordToken;

      const updatedUser = await this.userService.editUser(event.user);
      Object.assign(this.selectedUserProfile, updatedUser);
      console.log('ALL USERS AFTER OBJECT ASSIGN', this.allUsers);
    } else if (event.action === 'delete') {
      // delete user
    }
  }

  onUserEntriesSelectionChange(selectedUserIds: number[]): void {
    console.log(selectedUserIds);
    this.tempUserIds = selectedUserIds;
  }

  onUserProfileSelectionChange(selectedUser: any): void {
    console.log(selectedUser);
    this.selectedUserProfile = selectedUser;
  }

  handleApplyButton(): void {
    if (this.tempUserIds?.includes(-1)) {
      this.allUsersIds = this.allUsers.map((user) => user.userId);
    } else {
      this.allUsersIds = this.tempUserIds;
    }
  }
}

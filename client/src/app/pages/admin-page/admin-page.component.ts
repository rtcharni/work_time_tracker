import { Component, OnInit } from '@angular/core';
import { UserAndCompany, User, WorkEntry } from '@models';
import { UserService } from '@services';
import { UserFormEvent } from 'src/app/frontend-models/frontend.models';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as json2csv from 'papaparse';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    disabled: false,
  };
  selectedUserProfile: User;

  recentWorkEntriesToExport: WorkEntry[] = [];

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser();
    this.emptyUser.companyId = this.user.companyId;
    this.allUsers = await this.userService.getCompanysAllUsers(true);
    this.allUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  async selectedTabChange($event: MatTabChangeEvent): Promise<void> {
    if ($event.index === 0) {
      this.allUsers = await this.userService.getCompanysAllUsers(true);
      this.allUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      // tab changed to User profile tab. Do something if needed
    } else if ($event.index === 1) {
      // tab changed to Users work entries tab
      this.allUsers = await this.userService.getCompanysAllUsers();
      this.allUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      this.allUsers.sort((a, b) => (a.disabled ? 1 : -1));
      this.selectedUserProfile = undefined;
    }
  }

  async receiveUserFormEvent(event: UserFormEvent): Promise<any> {
    // IMPLEMENT HERE!!!!
    console.log(event);
    if (event.action === 'create') {
      delete event.user.userId;
      const newUser: User = await this.userService.addUser(event.user);
      this.allUsers.push(newUser);
      // send mail to users email
      this.userService.informUserCreated(newUser);
      // show the id of created user
      this.snackBar.open(`User created with ID: ${newUser.userId}`, 'Roger!', {
        // duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else if (event.action === 'edit') {
      if (this.user.userId !== event.user.userId || this.user.password === event.user.password) {
        delete event.user.password;
      }
      delete event.user.companyId;
      delete event.user.resetPasswordToken;

      const updatedUser = await this.userService.editUser(event.user);
      if (updatedUser) {
        Object.assign(this.selectedUserProfile, updatedUser);
      }
    } else if (event.action === 'delete') {
      const deleted = await this.userService.deleteUser(event.user.userId);
      if (deleted) {
        this.allUsers = this.allUsers.filter(user => user.userId !== deleted.userId);
        this.selectedUserProfile = null;
      }
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
      this.allUsersIds = this.allUsers.map(user => user.userId);
    } else {
      this.allUsersIds = this.tempUserIds;
    }
  }

  receiveWorkEntriesChangedEvent($event: WorkEntry[]): void {
    this.recentWorkEntriesToExport = $event;
  }

  exportToCsv(): void {
    if (!this.recentWorkEntriesToExport.length) {
      this.snackBar.open(`No entries to export..`, null, {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
    const csv = json2csv.unparse(this.recentWorkEntriesToExport, {
      delimiter: ';',
    });
    console.log(csv);
    const blob = new Blob([csv], { type: 'text/csv' });
    const anchor = document.createElement('a');
    anchor.download = `workapp_work_entries_${new Date().toISOString()}.csv`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
  }
}

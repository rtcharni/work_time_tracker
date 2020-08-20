import { Component, OnInit } from '@angular/core';
import { UserService } from '@services';
import { UserAndCompany } from '@models';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserFormEvent } from 'src/app/frontend-models/frontend.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  user: UserAndCompany;
  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  selectedTabChange($event: MatTabChangeEvent): void {
    if ($event.index === 0) {
      console.log('First tab opened');
    } else if ($event.index === 1) {
      // tab changed to Users work entries tab
      console.log('Second tab opened');
    }
  }

  async receiveUserFormEvent(event: UserFormEvent): Promise<any> {
    console.log(event);
    if (event.action === 'edit') {
      if (this.user.password === event.user.password) {
        delete event.user.password;
      }
      delete event.user.companyId;
      delete event.user.resetPasswordToken;
      delete event.user.admin;
      console.log(`Final!`, event.user);
      console.log(`Before update`, this.user);
      const updatedUser = await this.userService.editUser(event.user);
      if (updatedUser) {
        Object.assign(this.user, updatedUser);
        this.snackBar.open(`Changes saved successfully!`, null, {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log(`After update`, this.user);
      }
    }
  }
}

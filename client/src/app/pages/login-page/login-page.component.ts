import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../../../../models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  userId: number = null;
  password = '';
  showForgotPasswordInput = false;
  forgotPassworkUserId = null;
  showNextStepsInfo = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async logInUser(): Promise<void> {
    if (typeof this.userId === 'number') {
      const loginResponse: LoginResponse = await this.userService.logInUser({
        userId: this.userId,
        password: this.password,
      });
      if (loginResponse.success) {
        this.router.navigate(['app/frontpage']);
      } else {
        // Wrong credentials
        this.snackBar.open(`User ID or Password is incorrect`, null, {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.log(`Wrong credentials`);
      }
    } else {
      // User ID is not number
      this.snackBar.open(`Please enter valid User ID`, null, {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  async handleForgotPassword(): Promise<void> {
    if (typeof this.forgotPassworkUserId === 'number') {
      // Allways return true not, to not give clues to evil users
      const res = await this.userService.forgotPassword(
        this.forgotPassworkUserId
      );

      this.snackBar.open(
        `Recovery email has been sent to user's registered email`,
        null,
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
      this.showNextStepsInfo = true;
    } else {
      // User ID is not number
      this.snackBar.open(`Please enter valid User ID`, null, {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
}

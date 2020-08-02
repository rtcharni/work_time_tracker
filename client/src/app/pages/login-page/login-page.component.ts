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

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async logInUser(): Promise<void> {
    const loginResponse: LoginResponse = await this.userService.logInUser({
      userId: this.userId,
      password: this.password,
    });
    if (loginResponse.success) {
      this.router.navigate(['frontpage']);
    } else {
      // Wrong credentials
      console.log(`Wrong credentials`);
    }
  }

  handleForgotPassword(): void {
    // Send email, show some snackbar
    this.snackBar.open(
      this.forgotPassworkUserId
        ? `Recovery email has been sent to user's registered email`
        : `Don't forget to enter your User ID`,
      this.forgotPassworkUserId ? 'Check your email in a sec!' : null,
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  }
}

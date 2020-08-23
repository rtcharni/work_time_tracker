import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@services';

@Component({
  selector: 'app-resetpassword-page',
  templateUrl: './resetpassword-page.component.html',
  styleUrls: ['./resetpassword-page.component.css'],
})
export class ResetpasswordPageComponent implements OnInit {
  token: string;
  password: string;
  verifyPassword: string;
  passwordChanged = false;
  unsuccessful = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
  }

  async handleResetPasswordButton(): Promise<void> {
    this.passwordChanged = false;
    this.unsuccessful = false;

    if (!this.password || !this.verifyPassword) {
      this.showSnackbar('Please enter password in both fields');
    } else if (this.password.length < 8 || this.verifyPassword.length < 8) {
      this.showSnackbar('Password minimum length is 8 characters');
    } else if (this.password !== this.verifyPassword) {
      this.showSnackbar('Passwords are not matching');
    } else {
      const success = await this.userService.resetPassword(this.token, this.password, this.verifyPassword);
      if (success) {
        this.passwordChanged = true;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 4000);
      } else {
        this.unsuccessful = true;
      }
    }
  }

  showSnackbar(text: string, buttonText?: string): void {
    this.snackBar.open(text, buttonText, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

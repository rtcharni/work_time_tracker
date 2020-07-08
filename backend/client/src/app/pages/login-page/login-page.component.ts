import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../../../../../models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  userId: number = null;
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  async logInUser(): Promise<void> {
    const loginResponse: LoginResponse = await this.userService.logInUser({
      userId: this.userId,
      password: this.password,
    });
    if (loginResponse.success) {
      this.router.navigate(['frontpage'], { skipLocationChange: true });
    } else {
    }
  }
}

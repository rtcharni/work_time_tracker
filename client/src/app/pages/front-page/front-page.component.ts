import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserAndCompany } from '../../../../../models';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
})
export class FrontPageComponent implements OnInit {
  user: UserAndCompany;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}

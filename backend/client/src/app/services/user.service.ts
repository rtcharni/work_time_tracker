import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  Config,
  UserCredentials,
  LoginResponse,
  User,
  UserAndCompany,
} from '../../../../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private config: Config | null = null;
  private user: UserAndCompany | null = null;

  constructor(private http: HttpClient) {}

  public getUser(): UserAndCompany {
    return this.user;
  }

  public async logInUser(
    userCredentials: UserCredentials
  ): Promise<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const loginResponse = await this.http
      // .post<LoginResponse>(`${this.baseUrl}/api/auth/login`, userCredentials, {
      .post<LoginResponse>(`/api/auth/login`, userCredentials, {
        headers,
      })
      .toPromise();

    this.user = loginResponse?.success ? loginResponse.userAndCompany : null;
    return loginResponse;
  }

  // public async logOutUser( ): Promise<any> {  }
}

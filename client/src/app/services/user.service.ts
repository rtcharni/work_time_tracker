import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  Config,
  UserCredentials,
  LoginResponse,
  User,
  UserAndCompany,
} from '../../../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: UserAndCompany | null = null;

  constructor(private http: HttpClient) {}

  public getUser(): UserAndCompany {
    return this.user;
  }

  public async getCompanysAllUsers(): Promise<User[]> {
    const params: HttpParams = new HttpParams().set(
      'companyId',
      this.user.companyId.toString()
    );
    const users: User[] = await this.http
      .get<User[]>(`/api/database/users`, { params })
      .toPromise();
    return users && users.length ? users : []; // or null
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

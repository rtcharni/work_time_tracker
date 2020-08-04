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
    const loginResponse = await this.http
      // .post<LoginResponse>(`${this.baseUrl}/api/auth/login`, userCredentials, {
      .post<LoginResponse>(`/api/auth/login`, userCredentials)
      .toPromise();

    this.user = loginResponse?.success ? loginResponse.userAndCompany : null;
    return loginResponse;
  }

  public async resetPassword(
    token: string,
    password: string,
    verifyPassword: string
  ): Promise<boolean> {
    const res = await this.http
      .post<boolean>(`/api/auth/resetpassword`, {
        token,
        password,
        verifyPassword,
      })
      .toPromise();
    return res;
  }

  public async forgotPassword(userId: number): Promise<boolean> {
    const res = await this.http
      .post<boolean>(`/api/auth/forgotpassword`, {
        userId,
      })
      .toPromise();
    return res;
  }
}

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

  public async addUser(user: User): Promise<User> {
    const updatedUser = await this.http
      .post<User[]>(`/api/database/users`, user)
      .toPromise();

    return updatedUser && updatedUser.length ? updatedUser[0] : null;
  }

  public async editUser(user: User | UserAndCompany): Promise<User> {
    const updatedUser = await this.http
      .patch<User[]>(`/api/database/users/${user.userId}`, user)
      .toPromise();

    return updatedUser && updatedUser.length ? updatedUser[0] : null;
  }

  public async deleteUser(userId: number): Promise<User> {
    const deletedUser = await this.http
      .delete<User[]>(`/api/database/users/${userId}`)
      .toPromise();

    return deletedUser && deletedUser.length ? deletedUser[0] : null;
  }

  public async logInUser(
    userCredentials: UserCredentials
  ): Promise<LoginResponse> {
    const loginResponse = await this.http
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

  public async informUserCreated(user: User): Promise<void> {
    this.http.post<void>(`/api/auth/informusercreated`, {
      user,
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  Config,
  UserCredentials,
  LoginResponse,
  User,
} from '../../../../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  private config: Config | null;
  private loggedInUser: User | null;

  private mockConfig: Config = {
    workFormFields: ['title', 'details', 'customerName'],
    testNumber: 22,
    testString: 'test string',
  };

  constructor(private http: HttpClient) {}

  public async getConfig(): Promise<Config> {
    // return this.http.get<Config>(this.baseUrl + 'FETCHCONFIG').toPromise();
    return this.mockConfig;
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

    this.loggedInUser = loginResponse?.success
      ? loginResponse.userAndCompany
      : null;
    return loginResponse;
  }

  // public async logOutUser( ): Promise<any> {  }
}

import { Company } from "./company";

export interface User {
  userId: number | undefined; // PK - login name
  password: string; // login password
  companyId: number; // FK
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  resetPasswordToken: string;
}

export interface UserCredentials {
  userId: number;
  password: string;
}

export interface LoginResponse {
  userAndCompany: UserAndCompany | undefined;
  success: boolean;
}

export type UserAndCompany = User & Company;

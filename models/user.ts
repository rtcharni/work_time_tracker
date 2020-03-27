export interface User {
  userId: number; // PK - login name
  password: string; // login password
  companyId: number; // FK
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

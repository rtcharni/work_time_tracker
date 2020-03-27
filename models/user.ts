export interface User {
  userId: number; // PK - login
  password: string; // password
  companyId: number; // FK
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

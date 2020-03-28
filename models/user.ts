export interface User {
  userId: number | undefined; // PK - login name
  password: string; // login password
  companyId: number; // FK
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

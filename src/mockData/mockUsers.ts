import { User } from "../../models";

export const mockUsers: User[] = [
  {
    userId: 1,
    companyId: 1,
    email: "somemail@gmail.com",
    firstName: "first",
    lastName: "last",
    admin: true,
    password: "hashedpassword",
    resetPasswordToken: null,
  },
  {
    userId: 2,
    companyId: 1,
    email: "jeeje@gmail.com",
    firstName: "first22",
    lastName: "last222",
    admin: false,
    password: "hashedpassword",
    resetPasswordToken: null,
  },
  {
    userId: 3,
    companyId: 2,
    email: "hoplop@gmail.com",
    firstName: "jesjes",
    lastName: "basbas",
    admin: true,
    password: "hashedpassword",
    resetPasswordToken: null,
  },
];

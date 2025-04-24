export enum UserRoles {
  Admin = "admin",
  Client = "client",
}

export interface User {
  _id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoles;
  orders: string[];
  isActivated: boolean;
}

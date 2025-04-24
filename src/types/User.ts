export interface User {
  _id: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "client";
  orders: string[];
  isActivated: boolean;
}

// src/lib/types/auth/index.ts
export interface User {
  userId: string;
  isActivated: boolean;
  role: "admin" | "client";
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}

export interface CreateUserDTO {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
}

export interface UserQueryDTO {
  name?: string;
  email?: string;
  phoneNumber?: string;
  sort?: "asc" | "desc";
  pageNumber?: number;
  sortBy?: "name" | "birthDate" | "createdAt";
}

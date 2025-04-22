export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignInActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof SignInDTO]?: string[];
  };
  inputs?: SignInDTO;
}

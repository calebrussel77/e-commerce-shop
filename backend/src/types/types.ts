export const applicationJson = "application/json";

export interface SuccessResponse<T = any> {
  success: true;
  data?: T;
  msg?: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface IRequest {
  [key: string]: any;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}

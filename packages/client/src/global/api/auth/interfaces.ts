export interface I_SigninRequest {
  login: string;
  password: string;
}

export interface I_SignupRequest extends I_SigninRequest {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
}

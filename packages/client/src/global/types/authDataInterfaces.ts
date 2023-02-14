/* eslint-disable @typescript-eslint/naming-convention */

export interface I_SigninPayload {
  login: string;
  password: string;
}

export interface I_SignupPayload extends I_SigninPayload {
  mail: string;
  name: string;
  lastName: string;
  phone: string;
  confirmPassword: string;
}

export interface I_UserInfo {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface I_ProfilePayload {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface I_PasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface I_AvatarPayload {
  avatar?: File;
}

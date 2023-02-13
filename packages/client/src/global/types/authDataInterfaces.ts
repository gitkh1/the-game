/* eslint-disable @typescript-eslint/naming-convention */
import { yup } from "../../modules/formBuilder";

export interface I_Signin {
  login: string;
  password: string;
}

export interface I_OAuthSignin {
  code: string;
  redirectUri: string;
}

export interface I_Signup {
  mail: string;
  login: string;
  name: string;
  lastName: string;
  phone: string;
  password: string;
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

export interface I_UserUpdate {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface I_UserPwd {
  avatar: string | null;
}

export const validationSignUpSchema = yup.object().shape({
  email: yup.string().mail(),
  login: yup.string().login(),
  first_name: yup.string().name(),
  second_name: yup.string().name(),
  phone: yup.string().phone(),
  password: yup.string().password(),
  confirmPassword: yup.string().confirmPassword(),
});

export const validationProfileSchema = yup.object().shape({
  email: yup.string().mail(),
  login: yup.string().login(),
  first_name: yup.string().name(),
  second_name: yup.string().name(),
  display_name: yup.string().name(),
  phone: yup.string().phone(),
});

export type T_SignUpSchema = typeof validationSignUpSchema;
export type T_ProfileSchema = typeof validationProfileSchema;

import { yup } from '../../modules/formBuilder';

export interface T_SigninData {
  login: string;
  password: string;
}

export interface T_SignupData {
  mail: string;
  login: string;
  name: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface T_UserInfoData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface T_UserUpdateData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface T_UserPwdData {
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

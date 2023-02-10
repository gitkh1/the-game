export interface I_User {
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
  avatar: File;
}

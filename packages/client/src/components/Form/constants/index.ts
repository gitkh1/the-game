/* eslint-disable @typescript-eslint/naming-convention */

export type T_FormFieldNames = typeof FORM_FIELDS[keyof typeof FORM_FIELDS];

export type T_FormStructure = {
  title?: string;
  fields: T_FormField[];
  links?: T_FormLink[];
  submit?: T_FromSubmit;
};

export type T_FormField = {
  id: string;
  type: E_FormFieldType;
  name: string;
  label: string;
  defaultValue?: string | null;
  mask?: string;
  disabled?: boolean;
};

export type T_FormLink = {
  to: string;
  title: string;
};

export type T_FromSubmit = {
  title: string;
};

export enum E_FormFieldType {
  Avatar = "avatar",
  Text = "text",
  Password = "password",
  Input = "input",
}

export const FORM_FIELDS = {
  AVATAR: "avatar",
  LOGIN: "login",
  PASSWORD: "password",
  EMAIL: "email",
  FEEDBACK: "feedback",
  FIRST_NAME: "first_name",
  SECOND_NAME: "second_name",
  DISPLAY_NAME: "display_name",
  PHONE: "phone",
  OLD_PASSWORD: "oldPassword",
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword",
} as const;

export const FORM_FIELDS_META: Record<T_FormFieldNames, T_FormField> = {
  [FORM_FIELDS.AVATAR]: {
    id: "avatar",
    type: E_FormFieldType.Avatar,
    name: "avatar",
    label: "",
  },
  [FORM_FIELDS.LOGIN]: {
    id: "login",
    type: E_FormFieldType.Input,
    name: "login",
    label: "Логин",
  },
  [FORM_FIELDS.PASSWORD]: {
    id: "password",
    type: E_FormFieldType.Password,
    name: "password",
    label: "Пароль",
  },
  [FORM_FIELDS.EMAIL]: {
    id: "email",
    type: E_FormFieldType.Input,
    name: "email",
    label: "Почта",
  },
  [FORM_FIELDS.FIRST_NAME]: {
    id: "first_name",
    type: E_FormFieldType.Input,
    name: "first_name",
    label: "Имя",
  },
  [FORM_FIELDS.SECOND_NAME]: {
    id: "second_name",
    type: E_FormFieldType.Input,
    name: "second_name",
    label: "Фамилия",
  },
  [FORM_FIELDS.DISPLAY_NAME]: {
    id: "display_name",
    type: E_FormFieldType.Input,
    name: "display_name",
    label: "Имя в чате",
  },
  [FORM_FIELDS.PHONE]: {
    id: "phone",
    type: E_FormFieldType.Input,
    name: "phone",
    label: "Телефон",
  },
  [FORM_FIELDS.OLD_PASSWORD]: {
    id: "oldPassword",
    type: E_FormFieldType.Password,
    name: "oldPassword",
    label: "Старый пароль",
  },
  [FORM_FIELDS.NEW_PASSWORD]: {
    id: "newPassword",
    type: E_FormFieldType.Password,
    name: "newPassword",
    label: "Новый пароль",
  },
  [FORM_FIELDS.CONFIRM_PASSWORD]: {
    id: "confirmPassword",
    type: E_FormFieldType.Password,
    name: "confirmPassword",
    label: "Пароль (ещё раз)",
  },
  [FORM_FIELDS.FEEDBACK]: {
    id: "feedback",
    type: E_FormFieldType.Text,
    name: "feedback",
    label: "Отзыв",
  },
};

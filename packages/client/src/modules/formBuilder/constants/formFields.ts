import { E_FormFieldType } from '../types';

export const FORM_FIELDS = {
  login: {
    id: 'login',
    type: E_FormFieldType.Text,
    name: 'login',
    label: 'Логин',
  },
  password: {
    id: 'password',
    type: E_FormFieldType.Password,
    name: 'password',
    label: 'Пароль',
  },
  email: {
    id: 'email',
    type: E_FormFieldType.Text,
    name: 'email',
    label: 'Почта',
  },
  first_name: {
    id: 'first_name',
    type: E_FormFieldType.Text,
    name: 'first_name',
    label: 'Имя',
  },
  second_name: {
    id: 'second_name',
    type: E_FormFieldType.Text,
    name: 'second_name',
    label: 'Фамилия',
  },
  display_name: {
    id: 'display_name',
    type: E_FormFieldType.Text,
    name: 'display_name',
    label: 'Имя в чате',
  },
  phone: {
    id: 'phone',
    type: E_FormFieldType.Text,
    name: 'phone',
    label: 'Телефон',
  },
  oldPassword: {
    id: 'old_password',
    type: E_FormFieldType.Password,
    name: 'old_password',
    label: 'Старый пароль',
  },
  newPassword: {
    id: 'new_password',
    type: E_FormFieldType.Password,
    name: 'new_password',
    label: 'Новый пароль',
  },
  confirmPassword: {
    id: 'confirmPassword',
    type: E_FormFieldType.Password,
    name: 'confirmPassword',
    label: 'Пароль (ещё раз)',
  },
};

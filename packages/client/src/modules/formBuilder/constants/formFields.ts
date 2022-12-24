import { E_FormFieldType } from '../types';

export const FORM_FIELDS = {
  login: {
    id: 'login',
    type: E_FormFieldType.Text,
    name: 'login',
    label: 'Логин',
    defaultValue: '',
  },
  password: {
    id: 'password',
    type: E_FormFieldType.Password,
    name: 'password',
    label: 'Пароль',
    defaultValue: '',
  },
  email: {
    id: 'email',
    type: E_FormFieldType.Text,
    name: 'email',
    label: 'Почта',
    defaultValue: '',
  },
  first_name: {
    id: 'first_name',
    type: E_FormFieldType.Text,
    name: 'first_name',
    label: 'Имя',
    defaultValue: '',
  },
  second_name: {
    id: 'second_name',
    type: E_FormFieldType.Text,
    name: 'second_name',
    label: 'Фамилия',
    defaultValue: '',
  },
  phone: {
    id: 'phone',
    type: E_FormFieldType.Text,
    name: 'phone',
    label: 'Телефон',
    defaultValue: '',
  },
  confirmPassword: {
    id: 'confirmPassword',
    type: E_FormFieldType.Password,
    name: 'confirmPassword',
    label: 'Пароль (ещё раз)',
    defaultValue: '',
  },
};

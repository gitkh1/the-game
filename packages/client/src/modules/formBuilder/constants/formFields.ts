import { E_FormFieldType } from '../types'

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
  mail: {
    id: 'mail',
    type: E_FormFieldType.Text,
    name: 'mail',
    label: 'Почта',
    defaultValue: '',
  },
  name: {
    id: 'name',
    type: E_FormFieldType.Text,
    name: 'name',
    label: 'Имя',
    defaultValue: '',
  },
  lastName: {
    id: 'lastName',
    type: E_FormFieldType.Text,
    name: 'lastName',
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
}

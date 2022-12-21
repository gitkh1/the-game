import React, { FC } from 'react'
import classes from './SigninPage.module.scss'
import {
  E_FormFieldType,
  FormBuilder,
  T_FormStructure,
} from '../../modules/formBuilder'
import { Box } from '@mui/material'

const FIELDS = [
  {
    id: 'mail',
    type: E_FormFieldType.Text,
    name: 'mail',
    label: 'Почта',
    defaultValue: '',
  },
  {
    id: 'login',
    type: E_FormFieldType.Text,
    name: 'login',
    label: 'Логин',
    defaultValue: '',
  },
  {
    id: 'name',
    type: E_FormFieldType.Text,
    name: 'name',
    label: 'Имя',
    defaultValue: '',
  },
  {
    id: 'lastName',
    type: E_FormFieldType.Text,
    name: 'lastName',
    label: 'Фамилия',
    defaultValue: '',
  },
  {
    id: 'phone',
    type: E_FormFieldType.Text,
    name: 'phone',
    label: 'Телефон',
    defaultValue: '',
  },
  {
    id: 'password',
    type: E_FormFieldType.Password,
    name: 'password',
    label: 'Пароль',
    defaultValue: '',
  },
  {
    id: 'confirmPassword',
    type: E_FormFieldType.Password,
    name: 'confirmPassword',
    label: 'Пароль (ещё раз)',
    defaultValue: '',
  },
]

export const SigninPage: FC = () => {
  const getFormStructure = (): T_FormStructure => {
    return {
      title: 'Регистрация',
      fields: FIELDS,
      link: {
        to: '/login',
        title: 'Войти',
      },
      submit: {
        title: 'Зарегистрироваться',
      },
    }
  }

  return (
    <Box className={classes.root}>
      <FormBuilder structure={getFormStructure()} />
    </Box>
  )
}

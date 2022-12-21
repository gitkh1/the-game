import React, { FC } from 'react'
import classes from './LoginPage.module.scss'
import {
  E_FormFieldType,
  FormBuilder,
  T_FormStructure,
} from '../../modules/formBuilder'
import { Box } from '@mui/material'

const FIELDS = [
  {
    id: 'login',
    type: E_FormFieldType.Text,
    name: 'login',
    label: 'Логин',
    defaultValue: '',
  },
  {
    id: 'password',
    type: E_FormFieldType.Password,
    name: 'password',
    label: 'Пароль',
    defaultValue: '',
  },
]

export const LoginPage: FC = () => {
  const getFormStructure = (): T_FormStructure => {
    return {
      title: 'Вход',
      fields: FIELDS,
      link: {
        to: '/signin',
        title: 'Нет аккаунта?',
      },
      submit: {
        title: 'Авторизоваться',
      },
    }
  }

  return (
    <Box className={classes.root}>
      <FormBuilder structure={getFormStructure()} />
    </Box>
  )
}

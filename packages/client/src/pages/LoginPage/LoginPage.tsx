import React, { FC } from 'react'
import classes from './LoginPage.module.scss'
import {
  EFormFieldType,
  FormBuilder,
  TFormLink,
  TFormScheme,
} from '../../modules/formBuilder'

const LOGIN_FORM_SCHEME: TFormScheme = [
  {
    id: 'login',
    type: EFormFieldType.Text,
    name: 'login',
    label: 'Логин',
  },
  {
    id: 'password',
    type: EFormFieldType.Password,
    name: 'password',
    label: 'Пароль',
  },
]

const LOGIN_FORM_LINK: TFormLink = {
  to: '/signin',
  title: 'Нет аккаунта?',
}

export const LoginPage: FC = () => {
  return (
    <div className={classes.root}>
      <FormBuilder
        title="Вход"
        scheme={LOGIN_FORM_SCHEME}
        submitTitle="Авторизоваться"
        link={LOGIN_FORM_LINK}
      />
    </div>
  )
}

import React, { FC } from 'react'
import * as yup from 'yup'
import { STYLES } from './SigninPage.styles'
import { FormBuilder, T_FormStructure } from '../../modules/formBuilder'
import { Box } from '@mui/material'
import { Layout } from '../../Layout'
import { getFormFields } from '../../modules/formBuilder/utils'
import { REG_EX } from '../../modules/formBuilder/constants/regEx'

type T_Data = {
  mail: string
  login: string
  name: string
  lastName: string
  phone: string
  password: string
  confirmPassword: string
}

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Регистрация',
    fields: getFormFields([
      'mail',
      'login',
      'name',
      'lastName',
      'phone',
      'password',
      'confirmPassword',
    ]),
    link: {
      to: '/login',
      title: 'Войти',
    },
    submit: {
      title: 'Зарегистрироваться',
    },
  }
}

const validationSchema = yup.object().shape({
  mail: yup.string().trim().matches(REG_EX.email),
  login: yup.string().trim().matches(REG_EX.login),
  name: yup.string().trim().matches(REG_EX.login),
  lastName: yup.string().trim().matches(REG_EX.login),
  phone: yup.string().trim().matches(REG_EX.phone),
  password: yup.string().trim().matches(REG_EX.password),
  confirmPassword: yup
    .string()
    .trim()
    .matches(REG_EX.password)
    .oneOf([yup.ref('password')]),
})

type T_Schema = typeof validationSchema

export const SigninPage: FC = () => {
  const onSubmit = (data: T_Data) => {
    console.log(data)
  }

  return (
    <Box sx={STYLES.root}>
      <FormBuilder<T_Data, T_Schema>
        onSubmit={onSubmit}
        structure={getFormStructure()}
        validationSchema={validationSchema}
      />
    </Box>
  )
}

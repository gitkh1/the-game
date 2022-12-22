import React, { FC } from 'react'
import * as yup from 'yup'
import classes from './LoginPage.module.scss'
import { FormBuilder, T_FormStructure } from '../../modules/formBuilder'
import { Box } from '@mui/material'
import { Layout } from '../../Layout'
import { getFormFields } from '../../modules/formBuilder/utils'
import { REG_EX } from '../../modules/formBuilder/constants/regEx'

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Вход',
    fields: getFormFields(['login', 'password']),
    link: {
      to: '/signin',
      title: 'Нет аккаунта?',
    },
    submit: {
      title: 'Авторизоваться',
    },
  }
}

const validationSchema = yup.object().shape({
  login: yup.string().trim().matches(REG_EX.login),
  password: yup.string().trim().matches(REG_EX.password),
})

type T_Schema = typeof validationSchema

type T_Data = {
  login: string
  password: string
}

export const LoginPage: FC = () => {
  const onSubmit = (data: T_Data) => {
    console.log(data)
  }

  return (
    <Layout>
      <Box className={classes.root}>
        <FormBuilder<T_Data, T_Schema>
          onSubmit={onSubmit}
          structure={getFormStructure()}
          validationSchema={validationSchema}
        />
      </Box>
    </Layout>
  )
}

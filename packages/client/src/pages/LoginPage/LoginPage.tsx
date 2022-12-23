import React, { FC } from 'react'
import { FormBuilder, T_FormStructure } from '../../modules/formBuilder'
import { Box } from '@mui/material'
import { getFormFields } from '../../modules/formBuilder/utils'
import { yup } from '../../modules/formBuilder/constants/validation'
import classes from './LoginPage.module.scss'

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
  login: yup.string().required().login(),
  password: yup.string().required().password(),
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
    <Box className={classes.root}>
      <Box className={classes.root__formWrapper}>
        <FormBuilder<T_Data, T_Schema>
          onSubmit={onSubmit}
          structure={getFormStructure()}
          validationSchema={validationSchema}
        />
      </Box>
    </Box>
  )
}

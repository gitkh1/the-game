import React, { FC } from 'react'
import {
  FormBuilder,
  T_FormStructure,
  yup,
  getFormFields,
} from '../../modules/formBuilder'
import Box from '@mui/material/Box'
import classes from './Signup.module.scss'

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
      'email',
      'login',
      'firstName',
      'secondName',
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
  mail: yup.string().trim().email().required(),
  login: yup.string().login().required(),
  name: yup.string().name().required(),
  lastName: yup.string().name().required(),
  phone: yup.number().required().phone(),
  password: yup.string().password().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
})

type T_Schema = typeof validationSchema

export const SignupPage: FC = () => {
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

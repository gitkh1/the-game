import React, { FC } from 'react';
import { FormBuilder, T_FormStructure, yup, getFormFields } from '../../modules/formBuilder';
import { Box } from '@mui/material';
import classes from './Signup.module.scss';
import { T_SignupData } from '../../global/types';
import { authApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../global/hooks';

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Регистрация',
    fields: getFormFields(['email', 'login', 'first_name', 'second_name', 'phone', 'password', 'confirmPassword']),
    link: {
      to: '/signin',
      title: 'Войти',
    },
    submit: {
      title: 'Зарегистрироваться',
    },
  };
};

const validationSchema = yup.object().shape({
  email: yup.string().mail(),
  login: yup.string().login(),
  first_name: yup.string().name(),
  second_name: yup.string().name(),
  phone: yup.string().phone(),
  password: yup.string().password(),
  confirmPassword: yup.string().confirmPassword(),
});

type T_Schema = typeof validationSchema;

export const SignupPage: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();

  const onSubmit = async (data: T_SignupData) => {
    try {
      await authApi.signup(data);
      navigate('/');
    } catch (e) {
      if (e instanceof Error && showAlert) showAlert(e.message);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.root__formWrapper}>
        <FormBuilder<T_SignupData, T_Schema> onSubmit={onSubmit} structure={getFormStructure()} validationSchema={validationSchema} />
      </Box>
    </Box>
  );
};

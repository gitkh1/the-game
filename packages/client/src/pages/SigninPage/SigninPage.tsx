import React, { FC } from 'react';
import { FormBuilder, T_FormStructure, getFormFields } from '../../modules/formBuilder';
import { Box } from '@mui/material';
import { yup } from '../../modules/formBuilder/constants/validation';
import classes from './SigninPage.module.scss';
import { T_SigninData } from '../../global/types';
import { authApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../global/hooks';

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Вход',
    fields: getFormFields(['login', 'password']),
    link: {
      to: '/signup',
      title: 'Нет аккаунта?',
    },
    submit: {
      title: 'Авторизоваться',
    },
  };
};

const validationSchema = yup.object().shape({
  login: yup.string().required().login(),
  password: yup.string().required().password(),
});

type T_Schema = typeof validationSchema;

export const SigninPage: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();

  const onSubmit = async (data: T_SigninData) => {
    try {
      await authApi.signin(data);
      navigate('/');
    } catch (e) {
      if (e instanceof Error && showAlert) showAlert(e.message);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.root__formWrapper}>
        <FormBuilder<T_SigninData, T_Schema> onSubmit={onSubmit} structure={getFormStructure()} validationSchema={validationSchema} />
      </Box>
    </Box>
  );
};

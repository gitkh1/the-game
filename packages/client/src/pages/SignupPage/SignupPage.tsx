import { FC, useState } from 'react';
import { FormBuilder, T_FormStructure, getFormFields, T_FormFieldNames } from '../../modules/formBuilder';
import { Box } from '@mui/material';
import classes from './Signup.module.scss';
import { T_SignupData, validationSignUpSchema } from '../../global/types';
import { authApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../global/hooks';
import { UseFormReturn } from 'react-hook-form';
import { PATHS } from '../../routes';
import leaderBoardBG from '../../assets/images/signup-signin-bg.jpg';

const FIELDS: T_FormFieldNames = ['email', 'login', 'first_name', 'second_name', 'phone', 'password', 'confirmPassword'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Регистрация',
    fields: getFormFields(FIELDS),
    links: [{
      to: PATHS.SIGN_IN,
      title: 'Войти',
    }],
    submit: {
      title: 'Зарегистрироваться',
    },
  };
};

export const SignupPage: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: T_SignupData) => {
    try {
      await authApi.signup(data);
      navigate(PATHS.MAIN);
    } catch (e) {
      if (e instanceof Error && showAlert) {
        showAlert(e.message);
        setFieldErrors();
      }
    }
  };

  const getFormApi = (api: UseFormReturn) => {
    if (!formApi) setFormApi(api);
  };

  return (
    <Box className={classes['root']}>
      <img src={leaderBoardBG} alt="leader-board-background" className={classes['background']} />
      <Box
        className={classes['root__formWrapper']}
        sx={{
          padding: '25px',
          borderRadius: '10px',
          background: 'rgba(0,0,0,.5)',
          color: 'white'
        }}
      >
        <FormBuilder<T_SignupData>
          onSubmit={onSubmit}
          structure={getFormStructure()}
          validationSchema={validationSignUpSchema}
          getFormApi={getFormApi}
          displayAvatar={false}
        />
      </Box>
    </Box>
  );
};

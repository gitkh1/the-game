import { FC, useState } from 'react';
import { FormBuilder, T_FormFieldNames, T_FormStructure, getFormFields } from '../../modules/formBuilder';
import { Box } from '@mui/material';
import { yup } from '../../modules/formBuilder/constants/validation';
import classes from './SigninPage.module.scss';
import { T_SigninData } from '../../global/types';
import { authApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../global/hooks';
import { UseFormReturn } from 'react-hook-form';
import leaderBoardBG from '../../assets/images/signup-signin-bg.jpg';
import { PATHS } from '../../routes';

const FIELDS: T_FormFieldNames = ['login', 'password'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Вход',
    fields: getFormFields(FIELDS),
    links: [{
      to: PATHS.SIGN_UP,
      title: 'Нет аккаунта?',
    }],
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
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: T_SigninData) => {
    try {
      await authApi.signin(data);
      navigate(PATHS.PROFILE);
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
      <img src={leaderBoardBG} alt="leader-board-background" className={ classes['background'] }/>
      <Box 
        className={classes['root__formWrapper']} 
        sx={{
          padding: '25px',
          borderRadius: '10px',
          background: 'rgba(0,0,0,.5)',
          color:'white'
        }}
      >
        <FormBuilder<T_SigninData, T_Schema>
          onSubmit={onSubmit}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
          displayAvatar={false}
        />
      </Box>
    </Box>
  );
};

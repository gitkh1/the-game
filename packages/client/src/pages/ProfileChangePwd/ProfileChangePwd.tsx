import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from '../../modules/formBuilder';
import { T_ProfileSchema, I_UserInfo, I_UserPwd, validationProfileSchema } from '../../global/types';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../global/hooks';
import { UseFormReturn } from 'react-hook-form';
import { PATHS } from '../../routes';
import { userApi } from '../../api/User';
import classes from '../../global/styles/ProfilePages.module.scss';
import profileBG from '../../assets/images/game-main-menu-bg.jpg';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const FIELDS: T_FormFieldNames = ['oldPassword', 'newPassword', 'confirmPassword'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Пользователь',
    fields: getFormFields(FIELDS),
    submit: {
      title: 'Сохранить',
    },
  };
};

export const ProfileChangePwd: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_UserPwd) => {
    try {
      await userApi.changePwd(data);
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
    <Box className={classes.root}>
      <img src={profileBG} alt="profile-background" className={classes['background']} />
      <Box className={classes.root__formWrapper}>
        <FormBuilder<I_UserInfo, T_ProfileSchema>
          onSubmit={onSubmit}
          structure={getFormStructure()}
          validationSchema={validationProfileSchema}
          getFormApi={getFormApi}
          values={null}
          displayAvatar={false}
        />
        <NavLink to={PATHS.PROFILE} className={classes['profile__button']}>
          <Button color="primary" variant="contained">
            Назад
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};

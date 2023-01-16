import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import classes from './Profile.module.scss';
import { E_FormMode, FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from '../../modules/formBuilder';
import { T_ProfileSchema, T_UserInfoData } from '../../global/types';
import { PATHS } from '../../routes';
import { authApi } from '../../api';

const FIELDS: T_FormFieldNames = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Пользователь',
    fields: getFormFields(FIELDS),
    links: [
      {
        to: PATHS.PROFILE_CHANGE_DATA,
        title: 'Изменить данные'
      },
      {
        to: PATHS.PROFILE_CHANGE_PWD,
        title: 'Изменить пароль'
      },
      {
        to: PATHS.GAME,
        title: 'Выйти'
      },
    ]
  };
};

export const Profile: FC = () => {
  const [userInfo, setUserInfo] = useState<T_UserInfoData | undefined>(undefined);

  useEffect(() => {
    authApi.getInfo()
      .then((response) => {
        setUserInfo(response as T_UserInfoData);
      }).catch((e) => console.log(e));
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.root__formWrapper}>
        <FormBuilder<T_UserInfoData, T_ProfileSchema>
          structure={getFormStructure()}
          mode={E_FormMode.View}
          values={userInfo}
        />
      </Box>
    </Box >
  );
};

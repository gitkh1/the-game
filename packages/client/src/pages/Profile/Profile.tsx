import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import classes from './Profile.module.scss';
import { T_ProfileSchema, I_UserInfoData } from '../../global/types';
import profileBG from '../../assets/images/game-main-menu-bg.jpg';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { authApi } from '../../api';
import { E_FormMode, FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from '../../modules/formBuilder';
import { PATHS } from '../../routes';

const FIELDS: T_FormFieldNames = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Пользователь',
    fields: getFormFields(FIELDS),
  };
};

export const Profile: FC = () => {
  const [userInfo, setUserInfo] = useState<I_UserInfoData | undefined>(undefined);

  useEffect(() => {
    authApi
      .getInfo<I_UserInfoData>()
      .then((response) => {
        setUserInfo(response);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box className={classes['root']}>
      <img src={profileBG} alt="profile-background" className={classes['background']} />
      <Box className={classes['root__formWrapper']}>
        <FormBuilder<I_UserInfoData, T_ProfileSchema> structure={getFormStructure()} mode={E_FormMode.View} values={userInfo} />
        <div className={classes['buttons__container']}>
          <NavLink to={PATHS.PROFILE_CHANGE_DATA} className={classes['profile__button']}>
            <Button color="primary" variant="contained">
              Изменить данные
            </Button>
          </NavLink>
          <NavLink to={PATHS.PROFILE_CHANGE_PWD} className={classes['profile__button']}>
            <Button color="primary" variant="contained">
              Изменить пароль
            </Button>
          </NavLink>
        </div>
      </Box>

      <div className={classes['buttons__container']}>
        <NavLink to={PATHS.MAIN_MENU} className={classes['profile__button']}>
          <Button color="primary" variant="contained">
            Вернуться в меню
          </Button>
        </NavLink>
        <NavLink to={PATHS.MAIN} className={classes['profile__button']}>
          <Button color="error" variant="contained">
            Выйти из аккаунта
          </Button>
        </NavLink>
      </div>
    </Box>
  );
};

import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import classes from './Profile.module.scss';
import profileBG from '../../assets/images/game-main-menu-bg.jpg';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { T_ProfileSchema, T_UserInfoData } from '../../global/types';
import profileBG from '../../assets/images/game-main-menu-bg.jpg';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { PATHS } from '../../routes';
import { authApi } from '../../api';
import { PATHS } from '../../routes';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const FIELDS: T_FormFieldNames = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

const getFormStructure = (): T_FormStructure => {
  return {
    title: 'Пользователь',
    fields: getFormFields(FIELDS),
  };
};

const Profile: FC = () => {

  const [userInfo, setUserInfo] = useState<T_UserInfoData | undefined>(undefined);

  useEffect(() => {
    authApi.getInfo<T_UserInfoData>()
      .then((response) => {
        setUserInfo(response);
      }).catch((e) => console.log(e));
  }, []);

  const formRef = React.useRef();
  const [isChangingData, setIsChangingData] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  const changeDataHandler = () => {
    if (isChangingData) {
      const data = Object.values(formRef.current || {});
      console.log(data);
    }
    setIsChangingData(!isChangingData);
  };

  const changePasswordHandler = () => {
    if (isChangingPassword) {
      const data = Object.values(formRef.current || {});
      console.log(data);
    }
    setIsChangingPassword(!isChangingPassword);
  };

  return (
    <Box className={classes['root']}>
      
      <img src={profileBG} alt="profile-background" className={ classes['background'] }/>
      <Box className={classes['root__formWrapper']}>
        <FormBuilder<T_UserInfoData, T_ProfileSchema>
          structure={getFormStructure()}
          mode={E_FormMode.View}
          values={userInfo}
        />
        <div className={classes['buttons__container']}>
          <NavLink to={ PATHS.PROFILE_CHANGE_DATA } className={classes['profile__button']}>
              <Button color = "primary" variant="contained">Изменить данные</Button>
          </NavLink>
          <NavLink to={ PATHS.PROFILE_CHANGE_PWD} className={classes['profile__button']}>
            <Button color = "primary" variant="contained">Изменить пароль</Button>
          </NavLink>
        </div>

      </Box>

      <div className={classes['buttons__container']}>
        <NavLink to={ PATHS.MAIN_MENU } className={classes['profile__button']}>
          <Button color = "primary" variant="contained">Вернуться в меню</Button>
        </NavLink>
        <NavLink to={ PATHS.MAIN } className={classes['profile__button']}>
          <Button color = "error" variant="contained">Выйти из аккаунта</Button>
        </NavLink>
      </div>

    </Box >
  );
};

export default Profile;

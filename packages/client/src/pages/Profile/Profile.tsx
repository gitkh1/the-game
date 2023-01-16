import React, { FC, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { userActions } from '../../global/store/actions';
import { useAppSelector } from '../../global/hooks';
import { Typography } from '@mui/material';

type T_ProfileFiedsProps = {
  isDisabled: boolean;
};
const ProfileFields: FC<T_ProfileFiedsProps> = ({ isDisabled }) => {
  return (
    <>
      <TextField
        disabled={isDisabled}
        id="email"
        name="email"
        defaultValue={'pochta@yandex.ru'}
        InputProps={{
          startAdornment: <InputAdornment position="start">Почта</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="login"
        name="login"
        defaultValue={'ivanivanov'}
        InputProps={{
          startAdornment: <InputAdornment position="start">Логин</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="first_name"
        name="first_name"
        defaultValue={'Иван'}
        InputProps={{
          startAdornment: <InputAdornment position="start">Имя</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="second_name"
        name="second_name"
        defaultValue={'Иванов'}
        InputProps={{
          startAdornment: <InputAdornment position="start">Фамилия</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="display_name"
        name="display_name"
        defaultValue={'Иван'}
        InputProps={{
          startAdornment: <InputAdornment position="start">Имя в чате</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="phone"
        name="phone"
        defaultValue={'+7 (999) 999-99-99'}
        InputProps={{
          startAdornment: <InputAdornment position="start">Телефон</InputAdornment>,
        }}
      />
    </>
  );
};

const PasswordFields: FC = () => {
  return (
    <>
      <TextField
        id="oldPassword"
        name="oldPassword"
        InputProps={{
          startAdornment: <InputAdornment position="start">Старый пароль</InputAdornment>,
        }}
      />
      <TextField
        id="newPassword"
        name="newPassword"
        InputProps={{
          startAdornment: <InputAdornment position="start">Новый пароль</InputAdornment>,
        }}
      />
      <TextField
        id="newPassword2"
        name="newPassword2"
        InputProps={{
          startAdornment: <InputAdornment position="start">Новый пароль еще раз</InputAdornment>,
        }}
      />
    </>
  );
};

const Profile: FC = () => {
  const formRef = React.useRef();
  const [isChangingData, setIsChangingData] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { getUser } = userActions;

  useEffect(() => {
    getUser();
  }, []);

  // TODO Удалить при рефакторинге
  useEffect(() => {
    console.log(user);
  }, [user]);

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
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'grey', width: '130px', height: '140px' }}></Avatar>
        <Typography component="h1" variant="h5">
          Иван
        </Typography>
        <Box component="form" ref={formRef} noValidate sx={{ mt: 1 }}>
          {isChangingPassword ? <PasswordFields /> : <ProfileFields isDisabled={!isChangingData} />}
          <Box sx={{ mt: 4 }}>
            {!isChangingPassword && (
              <FormControl sx={{ borderBottom: '1px solid grey' }}>
                <Link onClick={changeDataHandler}>{isChangingData ? 'Сохранить' : 'Изменить данные'}</Link>
              </FormControl>
            )}
            {!isChangingData && (
              <FormControl sx={{ borderBottom: '1px solid grey' }}>
                <Link onClick={changePasswordHandler}>{isChangingPassword ? 'Сохранить' : 'Изменить пароль'}</Link>
              </FormControl>
            )}
            <FormControl sx={{ borderBottom: '1px solid grey' }}>
              <Link href="#" sx={{ color: 'red' }}>
                Выйти
              </Link>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;

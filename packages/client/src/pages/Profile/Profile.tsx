import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import classes from './Profile.module.scss';
import profileBG from '../../assets/images/game-main-menu-bg.jpg';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

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
        sx={{
          borderRadius: '10px',
          background: 'white'
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
        sx={{
          borderRadius: '10px',
          background: 'white'
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
        sx={{
          borderRadius: '10px',
          background: 'white'
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
        sx={{
          borderRadius: '10px',
          background: 'white'
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
        sx={{
          borderRadius: '10px',
          background: 'white'
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
        sx={{
          borderRadius: '10px',
          background: 'white'
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
        sx={{
          borderRadius: '10px',
          background: 'white'
        }}
      />
      <TextField
        id="newPassword"
        name="newPassword"
        InputProps={{
          startAdornment: <InputAdornment position="start">Новый пароль</InputAdornment>,
        }}
        sx={{
          borderRadius: '10px',
          background: 'white'
        }}
      />
      <TextField
        id="newPassword2"
        name="newPassword2"
        InputProps={{
          startAdornment: <InputAdornment position="start">Новый пароль еще раз</InputAdornment>,
        }}
        sx={{
          borderRadius: '10px',
          background: 'white'
        }}
      />
    </>
  );
};

const Profile: FC = () => {
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
    <>
      <img src={profileBG} alt="profile-background" className={ classes.background }/>
      <Container component="main" maxWidth="sm" >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'grey', width: '130px', height: '140px' }}></Avatar>
          <Typography component="h1" variant="h3" sx={{ color: 'white' }}>
            Иван
          </Typography>
          <Box component="form" ref={formRef} noValidate 
              sx={{ 
                mt: 1,
                padding: '25px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,.5)'
              }} 
             
          >
            {isChangingPassword ? <PasswordFields /> : <ProfileFields isDisabled={!isChangingData} />}
            <Box sx={{ mt: 4 }}>
              {!isChangingPassword && (
                <FormControl sx={{ borderBottom: '1px solid grey', fontSize:'20px' }}>
                  <Button 
                    color = "primary" 
                    variant="contained" 
                    onClick={changeDataHandler}>{isChangingData ? 'Сохранить' : 'Изменить данные'}
                  </Button>
                </FormControl>
              )}
              {!isChangingData && (
                <FormControl sx={{ borderBottom: '1px solid grey', fontSize:'20px' }}>
                  <Button 
                    color = "primary" 
                    variant="contained" 
                    onClick={changePasswordHandler}>{isChangingPassword ? 'Сохранить' : 'Изменить пароль'}
                  </Button>
                </FormControl>
              )}
              
            </Box>
          </Box>
          <NavLink to='/main-menu' className={classes.back__button}>
            <Button color = "primary" variant="contained">Вернуться в меню</Button>
          </NavLink>
          <NavLink to='/' className={classes.back__button}>
            <Button color = "error" variant="contained">Выйти из аккаунта</Button>
          </NavLink>
        </Box>
      </Container>
    </>
  );
};

export default Profile;

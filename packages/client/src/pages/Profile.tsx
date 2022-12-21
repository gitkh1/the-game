import React from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        variant: "standard",
        fullWidth: true,
        inputProps: {
          sx: { textAlign: 'right' }
        }
      }
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        fullWidth: true,
      }
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
        sx: {
          cursor: "pointer",
        }
      }
    }
  }
});

type ProfileFiedsProps = {
  isDisabled: boolean;
}
function ProfileFields({ isDisabled }: ProfileFiedsProps) {
  return (
    <>
      <TextField
        disabled={isDisabled}
        id="email"
        name="email"
        defaultValue={"pochta@yandex.ru"}
        InputProps={{
          startAdornment: <InputAdornment position="start">Почта</InputAdornment>
        }}
      />
      <TextField
        disabled={isDisabled}
        id="login"
        name="login"
        defaultValue={"ivanivanov"}
        InputProps={{
          startAdornment: <InputAdornment position="start">Логин</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="first_name"
        name="first_name"
        defaultValue={"Иван"}
        InputProps={{
          startAdornment: <InputAdornment position="start">Имя</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="second_name"
        name="second_name"
        defaultValue={"Иванов"}
        InputProps={{
          startAdornment: <InputAdornment position="start">Фамилия</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="display_name"
        name="display_name"
        defaultValue={"Иван"}
        InputProps={{
          startAdornment: <InputAdornment position="start">Имя в чате</InputAdornment>,
        }}
      />
      <TextField
        disabled={isDisabled}
        id="phone"
        name="phone"
        defaultValue={"+7 (999) 999-99-99"}
        InputProps={{
          startAdornment: <InputAdornment position="start">Телефон</InputAdornment>,
        }}
      />
    </>
  )
}

function PasswordFields() {
  return (
    <>
      <TextField
        id="oldPassword"
        name="oldPassword"
        InputProps={{
          startAdornment: <InputAdornment position="start">Старый пароль</InputAdornment>
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
  )
}

export default function Profile() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [isChangingData, setIsChangingData] = React.useState(true);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'grey', width: '130px', height: '140px' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Иван
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {isChangingPassword
              ? <PasswordFields />
              : <ProfileFields isDisabled={isChangingData} />
            }
            <Box sx={{ mt: 4 }}>
              {!isChangingPassword &&
                <FormControl sx={{ borderBottom: '1px solid grey' }}>
                  <Link
                    onClick={() => setIsChangingData(!isChangingData)}
                  >
                    {isChangingData ? 'Изменить данные' : 'Сохранить'}
                  </Link>
                </FormControl>
              }
              {isChangingData &&
                <FormControl sx={{ borderBottom: '1px solid grey' }}>
                  <Link
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                  >{isChangingPassword ? 'Сохранить' : 'Изменить пароль'}
                  </Link>
                </FormControl>
              }
              <FormControl sx={{ borderBottom: '1px solid grey' }}>
                <Link href="#" sx={{ color: 'red' }}>Выйти</Link>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

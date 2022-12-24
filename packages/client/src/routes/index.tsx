import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import MainPage from '../pages/MainPage/MainPage';
import Profile from '../pages/Profile/Profile';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';
import Alert from '@mui/material/Alert';

export const routes = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/leaders',
    element: <LeaderBoard />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
];

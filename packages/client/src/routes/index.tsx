import { SigninPage } from '../pages/SigninPage';
import { SignupPage } from '../pages/SignupPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import MainPage from '../pages/MainPage/MainPage';
import GameMainMenu from '../pages/GameMainMenu/GameMainMenu';
import TutorialPage from '../pages/TutorialPage/TutorialPage';
import GameOverPage from '../pages/GameOverPage/GameOverPage';
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
    path: '/signin',
    element: <SigninPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/main-menu',
    element: <GameMainMenu />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
    errorElement: <Alert severity="error">Что-то пошло не так...</Alert>,
  },
  {
    path: '/game-over',
    element: <GameOverPage />,
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

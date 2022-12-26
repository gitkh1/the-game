import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import MainPage from '../pages/MainPage/MainPage';
import GameMainMenu from '../pages/GameMainMenu/GameMainMenu';
import TutorialPage from '../pages/TutorialPage/TutorialPage';
import Profile from '../pages/Profile/Profile';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';

export const routes = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/main-menu',
    element: <GameMainMenu />,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/leaders',
    element: <LeaderBoard />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

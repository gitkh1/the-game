import { SigninPage } from '../pages/SigninPage';
import { SignupPage } from '../pages/SignupPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import MainPage from '../pages/MainPage/MainPage';
import GameMainMenu from '../pages/GameMainMenu/GameMainMenu';
import Game from '../game/Game';
import TutorialPage from '../pages/TutorialPage/TutorialPage';
import GameOverPage from '../pages/GameOverPage/GameOverPage';
import Profile from '../pages/Profile/Profile';
import LeaderBoard from '../pages/LeaderBoard/LeaderBoard';
import { RouteObject } from 'react-router-dom';
import { GuestOnlyRouter, SignedInOnlyRouter } from '../modules/RouterWithAuth';

export const routes: RouteObject[] = [
  {
    element: <GuestOnlyRouter invalidRedirectTo="/main-menu" />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <SignedInOnlyRouter invalidRedirectTo="/" />,
    children: [
      {
        path: '/main-menu',
        element: <GameMainMenu />,
      },
      {
        path: '/game',
        element: <Game />,
      },
      {
        path: '/tutorial',
        element: <TutorialPage />,
      },
      {
        path: '/game-over',
        element: <GameOverPage />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/leaders',
        element: <LeaderBoard />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

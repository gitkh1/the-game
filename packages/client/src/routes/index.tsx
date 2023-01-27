import { SigninPage } from '../pages/SigninPage';
import { SignupPage } from '../pages/SignupPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { MainPage } from '../pages/MainPage';
import { GameMainMenu } from '../pages/GameMainMenu';
import { TutorialPage } from '../pages/TutorialPage';
import { GameOverPage } from '../pages/GameOverPage';
import { Profile } from '../pages/Profile';
import { LeaderBoard } from '../pages/LeaderBoard';
import { ProfileChangeData } from '../pages/ProfileChangeData';
import { ProfileChangePwd } from '../pages/ProfileChangePwd';
import { Game } from '../game';
import { MainMenuSettings } from '../pages/MainMenuSettings';
import { AboutPage } from '../pages/AboutPage';
import { RouteObject } from 'react-router-dom';
import { GuestOnlyRouter, SignedInOnlyRouter } from '../modules/RouterWithAuth';

export const PATHS = {
  MAIN: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  MAIN_MENU: '/main-menu',
  GAME: '/game',
  TUTORIAL: '/tutorial',
  GAMEOVER: '/game-over',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  PROFILE_CHANGE_DATA: '/profilechangedata',
  PROFILE_CHANGE_PWD: '/profilechangepwd',
  LEADERS: '/leaders',
  ABOUT: '/about',
  NOT_FOUND_PAGE: '*',
};

export const routes: RouteObject[] = [
  {
    element: <GuestOnlyRouter redirectInvalidTo={PATHS.MAIN_MENU} />,
    children: [
      {
        path: PATHS.MAIN,
        element: <MainPage />,
      },
      {
        path: PATHS.SIGN_IN,
        element: <SigninPage />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <SignupPage />,
      },
    ],
  },
  {
    element: <SignedInOnlyRouter redirectInvalidTo={PATHS.MAIN} />,
    children: [
      {
        path: PATHS.MAIN_MENU,
        element: <GameMainMenu />,
      },
      {
        path: PATHS.GAME,
        element: <Game />,
      },
      {
        path: PATHS.TUTORIAL,
        element: <TutorialPage />,
      },
      {
        path: PATHS.SETTINGS,
        element: <MainMenuSettings />,
      },
      {
        path: PATHS.GAMEOVER,
        element: <GameOverPage />,
      },
      {
        path: PATHS.PROFILE,
        element: <Profile />,
      },
      {
        path: PATHS.PROFILE_CHANGE_DATA,
        element: <ProfileChangeData />,
      },
      {
        path: PATHS.PROFILE_CHANGE_PWD,
        element: <ProfileChangePwd />,
      },
      {
        path: PATHS.LEADERS,
        element: <LeaderBoard />,
      },
      {
        path: PATHS.ABOUT,
        element: <AboutPage />,
      },
    ],
  },
  {
    path: PATHS.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
];

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
import PlayGame from '../Game/Game';

export const PATHS = {
  MAIN: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  MAIN_MENU: '/main-menu',
  GAME: '/game',
  TUTORIAL: '/tutorial',
  GAMEOVER: '/game-over',
  PROFILE: '/profile',
  PROFILE_CHANGE_DATA: '/profilechangedata',
  PROFILE_CHANGE_PWD: '/profilechangepwd',
  LEADERS: '/leaders',
  NOT_FOUND_PAGE: '*',
};

export const routes = [
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
  {
    path: PATHS.MAIN_MENU,
    element: <GameMainMenu />,
  },
  {
    path: PATHS.GAME,
    element: <PlayGame />,
  },
  {
    path: PATHS.TUTORIAL,
    element: <TutorialPage />,
  },
  {
    path: PATHS.TUTORIAL,
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
    path: PATHS.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
];

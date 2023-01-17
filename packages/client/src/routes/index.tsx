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
import MainMenuSettings from '../pages/MainMenuSettings/MainMenuSettings';
import AboutPage from '../pages/AboutPage/AboutPage';

export const routes = [
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
    path: '/settings',
    element: <MainMenuSettings />,
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
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

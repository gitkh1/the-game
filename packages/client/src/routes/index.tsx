import { RouteObject } from "react-router-dom";

import { GuestOnlyRouter, SignedInOnlyRouter } from "../modules/RouterWithAuth";
import { AboutPage } from "../pages/AboutPage";
import { ErrorPage } from "../pages/ErrorPage";
import { GameMainMenu } from "../pages/GameMainMenu";
import { GameOverPage } from "../pages/GameOverPage";
import { GamePage } from "../pages/GamePage";
import { LeaderBoard } from "../pages/LeaderBoard";
import { MainMenuSettings } from "../pages/MainMenuSettings";
import { MainPage } from "../pages/MainPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { Profile } from "../pages/Profile";
import { ProfileChangeData } from "../pages/ProfileChangeData";
import { ProfileChangePwd } from "../pages/ProfileChangePwd";
import { SigninPage } from "../pages/SigninPage";
import { SignupPage } from "../pages/SignupPage";
import { TutorialPage } from "../pages/TutorialPage";

export const PATHS = {
  MAIN: "/",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  MAIN_MENU: "/main-menu",
  GAME: "/game",
  TUTORIAL: "/tutorial",
  GAMEOVER: "/game-over",
  SETTINGS: "/settings",
  PROFILE: "/profile",
  PROFILE_CHANGE_DATA: "/profilechangedata",
  PROFILE_CHANGE_PWD: "/profilechangepwd",
  LEADERS: "/leaders",
  ABOUT: "/about",
  NOT_FOUND_PAGE: "*",
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
    ].map((child) => {
      return {
        ...child,
        errorElement: <ErrorPage />,
      };
    }),
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
        element: <GamePage />,
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
    ].map((child) => {
      return {
        ...child,
        errorElement: <ErrorPage />,
      };
    }),
  },
  {
    path: PATHS.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
];

// Вначале попробуем для ssr не проверять авторизацию
export const routesWithoutAuth: RouteObject[] = [
  {
    index: true,
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
    element: <GamePage />,
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
  {
    path: PATHS.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
].map((child) => {
  return {
    ...child,
    errorElement: <ErrorPage />,
  };
});

import { RouteObject } from "react-router-dom";

import { Game } from "../game";
import { GuestOnlyRouter, SignedInOnlyRouter } from "../modules/RouterWithAuth";
import { AboutPage } from "../pages/AboutPage";
import { ErrorPage } from "../pages/ErrorPage";
import { ForumPage } from "../pages/ForumPage";
import { ForumTopicPage } from "../pages/ForumTopicPage";
import { GameMainMenu } from "../pages/GameMainMenu";
import { GameOverPage } from "../pages/GameOverPage";
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
  FORUM: "/forum",
  FORUM_TOPIC: "/forum/:id",
  NOT_FOUND_PAGE: "*",
};

const isDev = process.env.NODE_ENV === "development";
const errorElement = isDev ? undefined : <ErrorPage />;

export const routes: RouteObject[] = [
  {
    element: <GuestOnlyRouter redirectInvalidTo={PATHS.MAIN_MENU} />,
    errorElement,
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
    errorElement,
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
      {
        path: PATHS.FORUM,
        element: <ForumPage />,
      },
      {
        path: PATHS.FORUM_TOPIC,
        element: <ForumTopicPage />,
      },
    ],
  },
  {
    path: PATHS.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
];

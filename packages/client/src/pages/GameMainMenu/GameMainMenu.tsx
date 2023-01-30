import { FC } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import gameMainMenuBG from "../../assets/images/game-main-menu-bg.jpg";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";
import classes from "./GameMainMenu.module.scss";

export const GameMainMenu: FC = () => {
  return (
    <div className={global["container"]}>
      <img src={gameMainMenuBG} alt="game-main-menu-background" className={global["background"]} />
      <div className={classes["main-menu"]}>
        <NavLink to={PATHS.GAME}>
          <Button color="primary" variant="contained">
            Начать игру
          </Button>
        </NavLink>
        <NavLink to={PATHS.TUTORIAL}>
          <Button color="primary" variant="contained">
            Как играть
          </Button>
        </NavLink>
        <NavLink to={PATHS.SETTINGS}>
          <Button color="primary" variant="contained">
            Настройки
          </Button>
        </NavLink>
        <NavLink to={PATHS.PROFILE}>
          <Button color="primary" variant="contained">
            Профиль
          </Button>
        </NavLink>
        <NavLink to={PATHS.LEADERS}>
          <Button color="primary" variant="contained">
            Таблица лидеров
          </Button>
        </NavLink>
        <NavLink to={PATHS.ABOUT}>
          <Button color="primary" variant="contained">
            Об авторах
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

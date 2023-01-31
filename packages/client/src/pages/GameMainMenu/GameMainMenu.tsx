import { FC } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import { Background } from "../../components/Background";
import { PATHS } from "../../routes";

import classes from "./GameMainMenu.module.scss";

export const GameMainMenu: FC = () => {
  return (
    <Background>
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
    </Background>
  );
};

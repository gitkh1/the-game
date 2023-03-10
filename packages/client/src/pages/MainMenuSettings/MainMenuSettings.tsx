import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import { Background } from "../../components/Background";
import { PATHS } from "../../routes";

import classes from "./MainMenuSettings.module.scss";

type T_WindowMode = "Оконный" | "Полноэкранный";

export const MainMenuSettings = () => {
  const [windowMode, setWindowMode] = useState<T_WindowMode>("Оконный");

  function toggleWindowMode() {
    if (document.fullscreenElement) {
      setWindowMode("Полноэкранный");
    } else {
      setWindowMode("Оконный");
    }
  }

  useEffect(() => {
    toggleWindowMode();

    document.addEventListener("fullscreenchange", toggleWindowMode);

    return () => {
      document.removeEventListener("fullscreenchange", toggleWindowMode);
    };
  }, []);

  function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        (() => void elem.requestFullscreen())();
      }
      setWindowMode("Полноэкранный");
    } else {
      if (document.exitFullscreen) {
        (() => void document.exitFullscreen())();
      }
      setWindowMode("Оконный");
    }
  }

  return (
    <Background>
      <div className={classes["settings"]}>
        <h2 className={classes["settings__header"]}>Настройки</h2>
        <div className={classes["settings__item"]}>
          <div className={classes["settings__description"]}>Режим экрана:</div>
          <Button color="primary" variant="contained" onClick={toggleFullscreen}>
            {windowMode}
          </Button>
        </div>
        <NavLink to={PATHS.MAIN_MENU}>
          <Button color="primary" variant="contained">
            Вернуться в меню
          </Button>
        </NavLink>
      </div>
    </Background>
  );
};

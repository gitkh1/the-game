import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import { Background } from "../../components/Background";
import { PATHS } from "../../routes";

import classes from "./MainMenuSettings.module.scss";

type T_WindowMode = "Оконный" | "Полноэкранный";
type T_Theme = "Тёмная" | "Светлая";

export const MainMenuSettings = () => {
  const [windowMode, setWindowMode] = useState<T_WindowMode>("Оконный");
  const [theme, setTheme] = useState<T_Theme>(localStorage.getItem("theme") === "dark" ? "Тёмная" : "Светлая");
  const [isWhiteBg, setIsWhiteBg] = useState<boolean>(false);

  function toggleWindowMode() {
    if (document.fullscreenElement) {
      setWindowMode("Полноэкранный");
    } else {
      setWindowMode("Оконный");
    }
  }

  function toggleTheme() {
    if (theme === "Тёмная") {
      localStorage.setItem("theme", "light");
      setIsWhiteBg(true);
      setTheme("Светлая");
    } else {
      localStorage.setItem("theme", "dark");
      setIsWhiteBg(false);
      setTheme("Тёмная");
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
    <Background isWhiteBg={isWhiteBg}>
      <div className={classes["settings"]}>
        <h2 className={classes["settings__header"]}>Настройки</h2>
        <div className={classes["settings__item"]}>
          <div className={classes["settings__description"]}>Режим экрана:</div>
          <Button color="primary" variant="contained" onClick={toggleFullscreen}>
            {windowMode}
          </Button>
        </div>
        <div className={classes["settings__item"]}>
          <div className={classes["settings__description"]}>Тема:</div>
          <Button color="primary" variant="contained" onClick={toggleTheme}>
            {theme}
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

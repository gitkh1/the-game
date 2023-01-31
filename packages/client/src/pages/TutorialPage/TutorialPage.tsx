import { FC } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

import tutorialImageOne from "../../assets/images/tutorial/tutorial-1.jpg";
import tutorialImageTwo from "../../assets/images/tutorial/tutorial-2.jpg";
import { Background } from "../../components/Background";
import { PATHS } from "../../routes";

import classes from "./TutorialPage.module.scss";

export const TutorialPage: FC = () => {
  return (
    <Background>
      <div className={classes["tutorial"]}>
        <h2 className={classes["tutorial__header"]}>Как играть</h2>
        <div className={classes["tutorial__item"]}>
          <div className={classes["tutorial__description"]}>Нажимайте ЛЕВУЮ КНОПКУ МЫШИ, чтобы метать снаряды во врагов.</div>
          <img src={tutorialImageOne} alt="tutorial-1" className={classes["tutorial__image"]} />
        </div>
        <div className={classes["tutorial__item"]}>
          <div className={classes["tutorial__description"]}>Нажимайте ПРОБЕЛ, чтобы оживлять врагов в виде скелетов.</div>
          <img src={tutorialImageTwo} alt="tutorial-2" className={classes["tutorial__image"]} />
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

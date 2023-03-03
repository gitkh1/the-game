import { FC } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";

import gameOverBGDark from "../../assets/images/dark-theme/game-over-bg.jpg";
import gameOverBGLight from "../../assets/images/light-theme/game-over-bg.jpg";
import { Background } from "../../components/Background";
import { PATHS } from "../../routes";

import classes from "./GameOverPage.module.scss";

export const GameOverPage: FC = () => {
  const [searchParams] = useSearchParams();
  const score = searchParams.get("score") ?? 0;

  return (
    <Background src={gameOverBGDark} whiteBg={gameOverBGLight}>
      <div className={classes["game-over"]}>
        <h2 className={classes["game-over__title"]}>Конец игры</h2>
        <span className={classes["game-over__score"]}>Итоговый счёт: {score}</span>
        <div className={classes["buttons__container"]}>
          <NavLink to={PATHS.GAME}>
            <Button color="primary" variant="contained">
              Повторить
            </Button>
          </NavLink>
          <NavLink to={PATHS.MAIN_MENU}>
            <Button color="primary" variant="contained">
              Вернуться в меню
            </Button>
          </NavLink>
        </div>
      </div>
    </Background>
  );
};

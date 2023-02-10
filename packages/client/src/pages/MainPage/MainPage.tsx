import { FC } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";

import mainPageBG from "../../assets/images/main-page-bg.jpg";
import { Background } from "../../components/Background";
import { useEffect } from "react";
import { useNotification } from "../../global/hooks";

import classes from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const { showAlert } = useNotification();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get(`code`);
    if (code) {
      const body = {
        code,
        redirect_uri: `http://localhost:3000`,
      };

      fetch("https://ya-praktikum.tech/api/v2/oauth/yandex", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body),
      })
        .then(() => {
          fetch("https://ya-praktikum.tech/api/v2/auth/user").catch((e) => {
            if (e instanceof Error && showAlert) {
              showAlert(e.message);
            }
          });
        })
        .catch((e) => {
          if (e instanceof Error && showAlert) {
            showAlert(e.message);
          }
        });
    }
  }, [searchParams]);

  return (
    <Background src={mainPageBG}>
      <div className={classes["main-page"]}>
        <h1>Necromancer</h1>
        <span className={classes["main-page__description"]}>
          Это экшен-РПГ игра, в которой вам предстоит взять на себя роль могущественного некроманта и защитить свои владения от волн недружелюбных к
          вам местных жителей.
        </span>
        <div className={classes["buttons__container"]}>
          <NavLink to="/signin">
            <Button color="primary" variant="contained">
              Логин
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button variant="contained">Регистрация</Button>
          </NavLink>
        </div>
      </div>
    </Background>
  );
};

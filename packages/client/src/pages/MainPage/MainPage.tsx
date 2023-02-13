import { FC, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";

import { oAuthApi } from "../../api";
import { REDIRECT_URL } from "../../api/constants";
import mainPageBG from "../../assets/images/main-page-bg.jpg";
import { Background } from "../../components/Background";
import { useNotification } from "../../global/hooks";
import { PATHS } from "../../routes";

import classes from "./MainPage.module.scss";

export const MainPage: FC = () => {
  const { showAlert } = useNotification();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get(`code`);
    if (code) {
      const body = {
        code,
        redirectUri: REDIRECT_URL,
      };

      oAuthApi.signin(body)
        .then(() => {
          navigate(PATHS.MAIN_MENU);
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

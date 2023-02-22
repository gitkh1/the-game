/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { authApi } from "../../api";
import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useAppDispatch, useUserInfo } from "../../global/hooks";
import { notificationActions } from "../../global/store/slices/notification";
import { userActions } from "../../global/store/slices/user";
import { I_UserInfo } from "../../global/types";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS = [
  FORM_FIELDS.AVATAR,
  FORM_FIELDS.EMAIL,
  FORM_FIELDS.LOGIN,
  FORM_FIELDS.FIRST_NAME,
  FORM_FIELDS.SECOND_NAME,
  FORM_FIELDS.DISPLAY_NAME,
  FORM_FIELDS.PHONE,
];

const getFormStructure = (data: I_UserInfo | null) => {
  return {
    title: "Пользователь",
    fields: FIELDS.map((field) => {
      const defaultValue = data?.[field];

      return {
        ...FORM_FIELDS_META[field],
        defaultValue,
      };
    }),
  };
};

export const Profile: FC = () => {
  const userInfo = useUserInfo();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await authApi.logout();
      await dispatch(userActions.getUser());
      navigate(PATHS.MAIN);
    } catch (e) {
      if (e instanceof Error) {
        dispatch(notificationActions.setNotification({ errorMessage: e.message }));
      }
    }
  };

  return (
    <Background>
      <Box className={global["form-wrapper"]}>
        <Form<I_UserInfo> structure={getFormStructure(userInfo)} disabled />
        <div className={global["buttons__container"]}>
          <NavLink to={PATHS.PROFILE_CHANGE_DATA} className={global["profile__button"]}>
            <Button color="primary" variant="contained">
              Изменить данные
            </Button>
          </NavLink>
          <NavLink to={PATHS.PROFILE_CHANGE_PWD} className={global["profile__button"]}>
            <Button color="primary" variant="contained">
              Изменить пароль
            </Button>
          </NavLink>
        </div>
      </Box>
      <div className={global["buttons__container"]}>
        <NavLink to={PATHS.MAIN_MENU} className={global["profile__button"]}>
          <Button color="primary" variant="contained">
            Вернуться в меню
          </Button>
        </NavLink>
        <Button color="error" variant="contained" className={global["profile__button"]} onClick={() => void onLogout()}>
          Выйти из аккаунта
        </Button>
      </div>
    </Background>
  );
};

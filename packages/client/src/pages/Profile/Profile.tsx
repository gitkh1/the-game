import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useUserInfo } from "../../global/hooks";
import { I_User } from "../../global/store/user";
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

const getFormStructure = (data: I_User | null) => {
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
  const { data: userInfo } = useUserInfo();

  return (
    <Background>
      <Box className={global["form-wrapper"]}>
        <Form<I_User> structure={getFormStructure(userInfo)} disabled />
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
        <NavLink to={PATHS.MAIN} className={global["profile__button"]}>
          <Button color="error" variant="contained">
            Выйти из аккаунта
          </Button>
        </NavLink>
      </div>
    </Background>
  );
};

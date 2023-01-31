import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { Background } from "../../components/Background";
import { useUserInfo } from "../../global/hooks";
import { I_UserInfo, T_ProfileSchema } from "../../global/types";
import { E_FormMode, FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from "../../modules/formBuilder";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS: T_FormFieldNames = ["email", "login", "first_name", "second_name", "display_name", "phone"];

const getFormStructure = (): T_FormStructure => {
  return {
    title: "Пользователь",
    fields: getFormFields(FIELDS),
  };
};

export const Profile: FC = () => {
  const userInfo = useUserInfo();

  return (
    <Background>
      <Box className={global["form-wrapper"]}>
        <FormBuilder<I_UserInfo, T_ProfileSchema> structure={getFormStructure()} mode={E_FormMode.View} values={userInfo} />
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

import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { userApi } from "../../api/User";
import profileBG from "../../assets/images/game-main-menu-bg.jpg";
import { useNotification } from "../../global/hooks";
import { I_UserInfo, I_UserPwd, T_ProfileSchema, validationProfileSchema } from "../../global/types";
import { FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from "../../modules/formBuilder";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS: T_FormFieldNames = ["oldPassword", "newPassword", "confirmPassword"];

const getFormStructure = (): T_FormStructure => {
  return {
    title: "Пользователь",
    fields: getFormFields(FIELDS),
    submit: {
      title: "Сохранить",
    },
  };
};

export const ProfileChangePwd: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_UserPwd) => {
    try {
      await userApi.changePwd(data);
      navigate(PATHS.PROFILE);
    } catch (e) {
      if (e instanceof Error && showAlert) {
        showAlert(e.message);
        setFieldErrors();
      }
    }
  };

  const getFormApi = (api: UseFormReturn) => {
    if (!formApi) setFormApi(api);
  };

  return (
    <Box className={global["container"]}>
      <img src={profileBG} alt="profile-background" className={global["background"]} />
      <Box className={global["form-wrapper"]}>
        <FormBuilder<I_UserInfo, T_ProfileSchema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationProfileSchema}
          getFormApi={getFormApi}
          values={null}
          displayAvatar={false}
        />
        <NavLink to={PATHS.PROFILE} className={global["profile__button"]}>
          <Button color="primary" variant="contained">
            Назад
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};

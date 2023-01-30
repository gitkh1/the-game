import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { authApi } from "../../api";
import leaderBoardBG from "../../assets/images/signup-signin-bg.jpg";
import { useNotification } from "../../global/hooks";
import { I_Signin } from "../../global/types";
import { FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from "../../modules/formBuilder";
import { yup } from "../../modules/formBuilder/constants/validation";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS: T_FormFieldNames = ["login", "password"];

const getFormStructure = (): T_FormStructure => {
  return {
    title: "Вход",
    fields: getFormFields(FIELDS),
    links: [
      {
        to: PATHS.SIGN_UP,
        title: "Нет аккаунта?",
      },
    ],
    submit: {
      title: "Авторизоваться",
    },
  };
};

const validationSchema = yup.object().shape({
  login: yup.string().required().login(),
  password: yup.string().required().password(),
});

type T_Schema = typeof validationSchema;

export const SigninPage: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_Signin) => {
    try {
      await authApi.signin(data);
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
      <img src={leaderBoardBG} alt="leader-board-background" className={global["background"]} />
      <Box className={global["form-wrapper"]}>
        <FormBuilder<I_Signin, T_Schema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
          displayAvatar={false}
        />
      </Box>
    </Box>
  );
};

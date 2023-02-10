import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { authApi } from "../../api";
import yandexIcon from "../../assets/icons/yandex-icon.jpg";
import signBG from "../../assets/images/signup-signin-bg.jpg";
import { Background } from "../../components/Background";
import { useNotification } from "../../global/hooks";
import { I_Signin } from "../../global/types";
import { FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from "../../modules/formBuilder";
import { yup } from "../../modules/formBuilder/constants/validation";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";
import classes from "./SigninPage.module.scss";

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

  const oAuthSignin = async () => {
    const redirectUri = `http://localhost:3000`;

    try {
      const response = await fetch("https://ya-praktikum.tech/api/v2/oauth/yandex/service-id");
      if (response.ok) {
        const { service_id: serviceId } = (await response.json()) as { service_id: string };

        window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`);
      }
    } catch (e) {
      if (e instanceof Error && showAlert) {
        showAlert(e.message);
      }
    }
  };

  const getFormApi = (api: UseFormReturn) => {
    if (!formApi) setFormApi(api);
  };

  return (
    <Background src={signBG}>
      <Box className={global["form-wrapper"]}>
        <FormBuilder<I_Signin, T_Schema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
          displayAvatar={false}
        />
        <Button
          style={{
            borderRadius: 20,
            backgroundColor: "black",
          }}
          variant="contained"
          onClick={() => void oAuthSignin()}
        >
          <img src={yandexIcon} alt="yandex-icon" className={classes.icon} />
          Войти с Яндекс ID
        </Button>
      </Box>
    </Background>
  );
};

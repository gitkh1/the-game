import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { authApi, oAuthApi } from "../../api";
import yandexIcon from "../../assets/icons/yandex-icon.jpg";
import signBG from "../../assets/images/signup-signin-bg.jpg";
import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useAppDispatch, useNotification } from "../../global/hooks";
import { userActions } from "../../global/store/slices/user";
import { I_SigninPayload } from "../../global/types";
import { yup } from "../../global/yup";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";
import classes from "./SigninPage.module.scss";

const FIELDS = [FORM_FIELDS.LOGIN, FORM_FIELDS.PASSWORD];

const getFormStructure = () => {
  return {
    title: "Вход",
    fields: FIELDS.map((field) => FORM_FIELDS_META[field]),
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
  const dispatch = useAppDispatch();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_SigninPayload) => {
    try {
      await authApi.signin(data);
      await dispatch(userActions.getUser());
      navigate(PATHS.MAIN_MENU);
    } catch (e) {
      if (e instanceof Error && showAlert) {
        showAlert(e.message);
        setFieldErrors();
      }
    }
  };

  const oAuthSignin = async () => {
    try {
      await oAuthApi.getServiceId();
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
        <Form<I_SigninPayload, T_Schema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
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

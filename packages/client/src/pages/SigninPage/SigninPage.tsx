import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Box } from "@mui/material";

import signBG from "../../assets/images/signup-signin-bg.jpg";
import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { authApi, I_SigninRequest } from "../../global/api/auth";
import { useNotification } from "../../global/hooks";
import { yup } from "../../global/yup";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

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
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_SigninRequest): Promise<void> => {
    try {
      await authApi.signin(data);
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
    <Background src={signBG}>
      <Box className={global["form-wrapper"]}>
        <Form<I_SigninRequest, T_Schema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
        />
      </Box>
    </Background>
  );
};

/* eslint-disable @typescript-eslint/naming-convention */
import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { authApi } from "../../api";
import signBG from "../../assets/images/signup-signin-bg.jpg";
import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useAppDispatch } from "../../global/hooks";
import { notificationActions } from "../../global/store/slices/notification";
import { I_SignupPayload } from "../../global/types";
import { yup } from "../../global/yup";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS = [
  FORM_FIELDS.EMAIL,
  FORM_FIELDS.LOGIN,
  FORM_FIELDS.FIRST_NAME,
  FORM_FIELDS.SECOND_NAME,
  FORM_FIELDS.PHONE,
  FORM_FIELDS.PASSWORD,
  FORM_FIELDS.CONFIRM_PASSWORD,
];

const getFormStructure = () => {
  return {
    title: "Регистрация",
    fields: FIELDS.map((field) => FORM_FIELDS_META[field]),
    links: [
      {
        to: PATHS.SIGN_IN,
        title: "Войти",
      },
    ],
    submit: {
      title: "Зарегистрироваться",
    },
  };
};

export const validationSchema = yup.object().shape({
  email: yup.string().mail(),
  login: yup.string().login(),
  first_name: yup.string().name(),
  second_name: yup.string().name(),
  phone: yup.string().phone(),
  password: yup.string().password(),
  confirmPassword: yup.string().confirmPassword(),
});

export type T_ValidationSchema = typeof validationSchema;

export const SignupPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_SignupPayload) => {
    try {
      await authApi.signup(data);
      navigate(PATHS.MAIN);
    } catch (e) {
      if (e instanceof Error) {
        dispatch(notificationActions.setNotification({ errorMessage: e.message }));
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
        <Form<I_SignupPayload, T_ValidationSchema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
        />
      </Box>
    </Background>
  );
};

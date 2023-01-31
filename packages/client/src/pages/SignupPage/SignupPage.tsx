import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { authApi } from "../../api";
import signBG from "../../assets/images/signup-signin-bg.jpg";
import { Background } from "../../components/Background";
import { useNotification } from "../../global/hooks";
import { I_Signup, validationSignUpSchema } from "../../global/types";
import { FormBuilder, getFormFields, T_FormFieldNames, T_FormStructure } from "../../modules/formBuilder";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS: T_FormFieldNames = ["email", "login", "first_name", "second_name", "phone", "password", "confirmPassword"];

const getFormStructure = (): T_FormStructure => {
  return {
    title: "Регистрация",
    fields: getFormFields(FIELDS),
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

export const SignupPage: FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_Signup) => {
    try {
      await authApi.signup(data);
      navigate(PATHS.MAIN);
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
        <FormBuilder<I_Signup>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSignUpSchema}
          getFormApi={getFormApi}
          displayAvatar={false}
        />
      </Box>
    </Background>
  );
};

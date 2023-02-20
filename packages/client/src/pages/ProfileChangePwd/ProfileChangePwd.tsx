import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { userApi } from "../../api/User";
import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useAppDispatch } from "../../global/hooks";
import { notificationActions } from "../../global/store/slices/notification";
import { I_PasswordPayload } from "../../global/types";
import { yup } from "../../global/yup";
import { PATHS } from "../../routes";

import global from "../../global/styles/Global.module.scss";

const FIELDS = [FORM_FIELDS.OLD_PASSWORD, FORM_FIELDS.NEW_PASSWORD, FORM_FIELDS.CONFIRM_PASSWORD];

const getFormStructure = () => {
  return {
    title: "Пользователь",
    fields: FIELDS.map((field) => FORM_FIELDS_META[field]),
    submit: {
      title: "Сохранить",
    },
  };
};

export const validationSchema = yup.object().shape({
  oldPassword: yup.string().password(),
  newPassword: yup.string().password(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newPassword")]),
});

type T_ValidationSchema = typeof validationSchema;

export const ProfileChangePwd: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = async (data: I_PasswordPayload) => {
    try {
      await userApi.changePwd(data);
      navigate(PATHS.PROFILE);
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
    <Background>
      <Box className={global["form-wrapper"]}>
        <Form<I_PasswordPayload, T_ValidationSchema>
          onSubmit={(data) => void onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
          getFormApi={getFormApi}
        />
        <NavLink to={PATHS.PROFILE} className={global["profile__button"]}>
          <Button color="primary" variant="contained">
            Назад
          </Button>
        </NavLink>
      </Box>
    </Background>
  );
};

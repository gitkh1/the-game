/* eslint-disable @typescript-eslint/naming-convention */
import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useAppDispatch, useNotification, useUserInfo } from "../../global/hooks";
import { I_AvatarPayload, I_ProfilePayload, I_User, updateAvatar, updateProfile } from "../../global/store/user";
import { yup } from "../../global/yup";
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
      const defaultValue = data?.[field] ?? "";

      return {
        ...FORM_FIELDS_META[field],
        defaultValue,
      };
    }),
    submit: {
      title: "Сохранить",
    },
  };
};

const validationSchema = yup.object().shape({
  email: yup.string().mail(),
  login: yup.string().login(),
  first_name: yup.string().name(),
  second_name: yup.string().name(),
  phone: yup.string().phone(),
});

type T_ValidationSchema = typeof validationSchema;

export const ProfileChangeData: FC = () => {
  const { data } = useUserInfo();

  const dispatch = useAppDispatch();
  const { showAlert } = useNotification();
  const [formApi, setFormApi] = useState<UseFormReturn | null>(null);

  const setFieldErrors = () => {
    FIELDS.forEach((name) => formApi?.setError(name, {}));
  };

  const onSubmit = (data: I_ProfilePayload & I_AvatarPayload): void => {
    const { avatar, ...restData } = data;

    console.log(restData);

    try {
      void dispatch(updateProfile(restData));
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar, avatar.name);
        console.log(avatar);
        void dispatch(updateAvatar(formData));
      }
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
    <Background>
      <Box className={global["form-wrapper"]}>
        <Form<I_ProfilePayload & I_AvatarPayload, T_ValidationSchema>
          onSubmit={onSubmit}
          structure={getFormStructure(data)}
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

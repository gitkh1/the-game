/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { Background } from "../../components/Background";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../../components/Form";
import { useAppDispatch, useNotification } from "../../global/hooks";
import { I_PasswordPayload, updatePassword } from "../../global/store/user";
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
  const dispatch = useAppDispatch();
  const { showAlert } = useNotification();

  const onSubmit = (data: I_PasswordPayload): void => {
    console.log(data);
    try {
      void dispatch(updatePassword(data));
    } catch (e) {
      if (e instanceof Error && showAlert) {
        showAlert(e.message);
      }
    }
  };

  return (
    <Background>
      <Box className={global["form-wrapper"]}>
        <Form<I_PasswordPayload, T_ValidationSchema>
          onSubmit={(data) => onSubmit(data)}
          structure={getFormStructure()}
          validationSchema={validationSchema}
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

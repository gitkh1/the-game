/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import cn from "classnames";

import { feedbackApi } from "../../api/Feedback";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { notificationActions } from "../../global/store/slices/notification";
import { I_Feedback, I_UserInfo } from "../../global/types";
import { yup } from "../../global/yup";
import { Form, FORM_FIELDS, FORM_FIELDS_META } from "../Form";

import styles from "./Feedback.module.scss";

const FIELDS = [FORM_FIELDS.LOGIN, FORM_FIELDS.EMAIL, FORM_FIELDS.FEEDBACK];

const getFormStructure = (data: I_UserInfo | null) => {
  return {
    title: "Отзыв",
    fields: FIELDS.map((field) => {
      let defaultValue: string | undefined;
      if (field === FORM_FIELDS.LOGIN || field === FORM_FIELDS.EMAIL) {
        defaultValue = data?.[field];
      }

      return {
        ...FORM_FIELDS_META[field],
        defaultValue,
      };
    }),
    submit: {
      title: "Отправить",
    },
  };
};

export const validationSchema = yup.object().shape({
  email: yup.string().mail(),
  login: yup.string().name(),
  feedback: yup.string().required(),
});

export type T_ValidationSchema = typeof validationSchema;

const FORM_STATE = {
  unset: "unset",
  hidden: "hidden",
  visible: "visible",
} as const;

export const Feedback: FC = () => {
  const [showForm, setShowForm] = useState<keyof typeof FORM_STATE>(FORM_STATE.unset);
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    setShowForm((prev) => {
      if (prev !== FORM_STATE.visible) return FORM_STATE.visible;
      return FORM_STATE.hidden;
    });
  };

  const handleSubmit = async (data: I_Feedback) => {
    try {
      await feedbackApi.send(data);
      dispatch(notificationActions.setNotification({ successMessage: "Отзыв успешно отправлен" }));
      clickHandler();
    } catch (e) {
      if (e instanceof Error) {
        dispatch(notificationActions.setNotification({ errorMessage: e.message }));
      }
    }
  };

  return (
    <>
      {!userInfo && null}
      {userInfo && (
        <div className={styles.feedback}>
          <div className={styles.button}>
            <ChatBubbleIcon onClick={clickHandler} />
          </div>
          <div
            className={cn(styles.form, {
              [styles.visible]: showForm === FORM_STATE.visible,
              [styles.hidden]: showForm === FORM_STATE.hidden,
            })}
          >
            <Form<I_Feedback, T_ValidationSchema>
              structure={getFormStructure(userInfo)}
              validationSchema={validationSchema}
              onSubmit={(data) => handleSubmit(data)}
            />
          </div>
        </div>
      )}
    </>
  );
};

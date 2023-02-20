/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, MouseEventHandler, useState } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import cn from "classnames";

// import { useUserInfo } from "../../global/hooks";
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
  display_name: yup.string().name(),
  feedback: yup.string().required(),
});

export type T_ValidationSchema = typeof validationSchema;

export const Feedback: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  // const userInfo = useUserInfo();

  const clickHandler: MouseEventHandler = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (data: I_Feedback) => {
    console.log(data);
  };

  return (
    <div className={styles.feedback}>
      <div className={styles.btn}>
        <ChatBubbleIcon onClick={clickHandler} />
      </div>
      <div
        className={cn(styles.form, {
          [styles.hide]: !showForm,
          [styles.show]: showForm,
        })}
      >
        <Form<I_Feedback, T_ValidationSchema> structure={getFormStructure(null)} validationSchema={validationSchema} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

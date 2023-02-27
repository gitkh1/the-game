import { FC } from "react";

import { E_FormFieldType, T_FormField } from "../../constants";
import { AvatarFiled } from "../AvatarFiled";
import { InputField } from "../InputField";
import { TextField } from "../TextField";

interface I_Props {
  field: T_FormField;
}

export const FieldBuilder: FC<I_Props> = ({ field }) => {
  if (field.type === E_FormFieldType.Avatar) {
    return <AvatarFiled {...field} />;
  }
  if (field.type === E_FormFieldType.Password || field.type === E_FormFieldType.Input) {
    return <InputField {...field} />;
  }
  if (field.type === E_FormFieldType.Text) {
    return <TextField {...field} />;
  }

  return null;
};

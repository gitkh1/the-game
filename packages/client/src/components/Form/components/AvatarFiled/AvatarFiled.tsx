import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { BASE_URL } from "../../../../global/api/base";
import { T_FormField } from "../../constants";

import classes from "./AvatarFiled.module.scss";

export const AvatarFiled: FC<T_FormField> = ({ name, disabled = false, defaultValue = null }) => {
  const { control, setValue } = useFormContext();
  const [avatar, setAvatar] = useState<string | null>(defaultValue);

  useEffect(() => {
    setAvatar(defaultValue);
  }, [defaultValue]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setValue(name, file);
    setAvatar(URL.createObjectURL(file));
  };

  return (
    <label className={classes.label} style={!disabled ? { cursor: "pointer" } : { cursor: "default" }}>
      {avatar && <img className={classes.label__img} src={`${BASE_URL}/resources${avatar}`} />}
      <input className={classes.label__input} type="file" accept="image/*" disabled={disabled} {...control.register(name)} onChange={handleChange} />
    </label>
  );
};

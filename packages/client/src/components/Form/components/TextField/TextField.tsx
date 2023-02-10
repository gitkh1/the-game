import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";
import { InputAdornment } from "@mui/material";
import MaterialTextField from "@mui/material/TextField";

import { T_FormField } from "../../types";

const CssTextField = styled(MaterialTextField)({
  "& .MuiInputBase-root": {
    borderRadius: 10,
    backgroundColor: "white",
    padding: "3px 10px",
  },
  "& .MuiInputBase-input": {
    textAlign: "right",
  },
});

export const TextField: FC<T_FormField> = ({ label, name, type, disabled = false, defaultValue = "" }) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  const hasError = !!errors?.[name];

  return (
    <CssTextField
      variant="standard"
      InputProps={{
        startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
      }}
      focused={false}
      type={type}
      error={hasError}
      disabled={disabled}
      {...control.register(name)}
    />
  );
};

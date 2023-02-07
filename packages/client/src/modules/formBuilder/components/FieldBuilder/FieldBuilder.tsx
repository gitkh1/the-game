import { FC, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";

import { T_FormField } from "../../types";

// const CssTextField = styled(TextField)({
//   "& .MuiInputBase-root": {
//     borderRadius: 10,
//     backgroundColor: "white",
//     padding: "3px 10px",
//   },
//   "& .MuiInputBase-input": {
//     textAlign: "right",
//   },
// });

export const FieldBuilder: FC<T_FormField> = ({ label, name, type, disabled = false, defaultValue = "" }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const ref = useRef<HTMLInputElement>();
  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    ref.current.value = `${defaultValue}`;
  }, [defaultValue]);

  const hasError = !!errors?.[name];

  return (
    <TextField
      variant="standard"
      InputProps={{
        startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
      }}
      focused={false}
      type={type}
      error={hasError}
      disabled={disabled}
      inputRef={ref}
      {...control.register(name)}
    />
  );
};

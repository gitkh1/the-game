import { FC, useEffect, useRef } from 'react';
import { T_FormField } from '../../types';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';

export const FieldBuilder: FC<T_FormField> = ({ label, name, type, disabled = false, defaultValue = '' }) => {
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
      label={label}
      type={type}
      error={hasError}
      disabled={disabled}
      inputRef={ref}
      {...control.register(name)}
    />
  );
};

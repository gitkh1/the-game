import { FC, useEffect, useState } from 'react';
import { T_FormField } from '../../types';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';

export const FieldBuilder: FC<T_FormField> = ({ label, name, type, defaultValue = '', disabled = false }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [val, setVal] = useState<string>(defaultValue);
  useEffect(() => {
    setVal(defaultValue);
  }, [defaultValue]);
  // Здесь ругается на компонент. Ругательство, думаю пройдет, когда будем по 
  // useEffect тащить данные в поле с редакса

  const hasError = !!errors?.[name];

  return (
    <TextField
      variant="standard"
      label={label}
      type={type}
      error={hasError}
      value={val}
      {...control.register(name, {
        disabled,
        value: defaultValue,
      })}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};

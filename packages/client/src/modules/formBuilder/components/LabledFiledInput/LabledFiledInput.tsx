import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { T_LabledFiledInput } from '../../types';
import classes from './LabledFiledInput.module.scss';

export const LabledFiledInput: FC<T_LabledFiledInput> = ({
  isActive = false,
  value = '',
  fileRef
}) => {
  const { control } = useFormContext();

  const [newValue, setNewValue] = useState(value);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target?.files?.[0]) {
      return;
    }
    setNewValue(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <label className={classes.label} style={isActive ? { cursor: 'pointer' } : { cursor: 'default' }}>
      <img className={classes.label__img} src={newValue || value} />
      <input
        className={classes.label__input}
        type='file'
        accept='image/*'
        disabled={!isActive}
        {...control.register('avatar')}
        ref={fileRef}
        onChange={handleChange}
      />
    </label >
  );
};

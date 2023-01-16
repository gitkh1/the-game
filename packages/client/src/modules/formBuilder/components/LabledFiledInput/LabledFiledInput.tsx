import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { T_LabledFiledInput } from '../../types';
import classes from './LabledFiledInput.module.scss';

export const LabledFiledInput: FC<T_LabledFiledInput> = ({
  isActive = false,
  value = '',
  fileRef
}) => {
  const { control } = useFormContext();

  const [val, setVal] = useState(value);
  useEffect(() => {
    setVal(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!(e && e.target && e.target.files && e.target.files[0])) {
      return;
    }
    setVal(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <label className={classes.label} style={isActive ? { cursor: 'pointer' } : { cursor: 'default' }}>
      {val &&
        <img className={classes.label__img} src={val} />
      }
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

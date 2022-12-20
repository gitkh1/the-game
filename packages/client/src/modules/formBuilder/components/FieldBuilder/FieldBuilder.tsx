import React, { FC } from 'react'
import { EFormFieldType, TFormSchemeItem } from '../../types'
import TextField from '@mui/material/TextField'

export const FieldBuilder: FC<TFormSchemeItem> = ({
  id,
  label,
  name,
  type,
  defaultValue,
}) => {
  if (type === EFormFieldType.Text || type === EFormFieldType.Password) {
    return (
      <TextField
        key={id}
        label={label}
        type={type}
        name={name}
        defaultValue={defaultValue ?? ''}
        variant="standard"
      />
    )
  }

  return null
}

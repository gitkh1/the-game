import React, { FC } from 'react'
import { T_FormField } from '../../types'
import TextField from '@mui/material/TextField'
import { useFormContext } from 'react-hook-form'

export const FieldBuilder: FC<T_FormField> = ({ label, name, type }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const hasError = !!errors?.[name]

  return (
    <TextField
      variant="standard"
      label={label}
      type={type}
      error={hasError}
      {...control.register(name)}
    />
  )
}

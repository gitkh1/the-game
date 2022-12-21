import React, { FC } from 'react'
import classes from './FormBuilder.module.scss'
import { T_FormStructure } from '../../types'
import { FieldBuilder } from '../FieldBuilder'
import { CustomLink } from '../../../../components/CustomLink'
import { Box, Typography, Button } from '@mui/material'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'

type T_Props = {
  structure: T_FormStructure
}

export const FormBuilder: FC<T_Props> = ({ structure }) => {
  const formApi = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = data => console.log(data)

  return (
    <FormProvider {...formApi}>
      <Box
        component="form"
        onSubmit={formApi.handleSubmit(onSubmit)}
        className={classes.root}>
        <Typography variant="h4" className={classes.root__title}>
          {structure.title}
        </Typography>
        <Box className={classes.root__fields}>
          {structure.fields.map(item => (
            <FieldBuilder key={item.id} {...item} />
          ))}
        </Box>
        <Box className={classes.root__footer}>
          <Button type="submit" variant="contained">
            {structure.submit.title}
          </Button>
          {structure.link && (
            <CustomLink to={structure.link.to} title={structure.link.title} />
          )}
        </Box>
      </Box>
    </FormProvider>
  )
}

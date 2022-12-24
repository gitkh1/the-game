import React, { useMemo } from 'react';
import { E_FormMode, T_FormStructure } from '../../types';
import { FieldBuilder } from '../FieldBuilder';
import { CustomLink } from '../../../../components/CustomLink';
import { Box, Typography, Button } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import classes from './FormBuilder.module.scss';

type T_Props<T_Data, T_Schema> = {
  mode?: E_FormMode;
  structure: T_FormStructure;
  validationSchema?: T_Schema;
  onSubmit: (data: T_Data) => void;
};

export const FormBuilder = <T_Data extends FieldValues = FieldValues, T_Schema extends AnyObjectSchema = AnyObjectSchema>({
  mode = E_FormMode.Edit,
  structure,
  validationSchema,
  onSubmit,
}: T_Props<T_Data, T_Schema>) => {
  const formApi = useForm<T_Data>({
    resolver: validationSchema && yupResolver(validationSchema),
  });

  const isEdit = useMemo(() => mode === E_FormMode.Edit, [mode]);

  const onFormSubmit: SubmitHandler<T_Data> = (data) => onSubmit(data);

  return (
    <FormProvider {...formApi}>
      <Box component="form" onSubmit={formApi.handleSubmit(onFormSubmit)} className={classes.root}>
        <Typography variant="h4" className={classes.root__title}>
          {structure.title}
        </Typography>
        <Box className={classes.root__fields}>
          {structure.fields.map((item) => (
            <FieldBuilder key={item.id} {...{ ...item, disabled: !isEdit }} />
          ))}
        </Box>
        {isEdit && (
          <Box className={classes.root__footer}>
            <Button type="submit" variant="contained">
              {structure.submit.title}
            </Button>
            {structure.link && <CustomLink to={structure.link.to} title={structure.link.title} />}
          </Box>
        )}
      </Box>
    </FormProvider>
  );
};

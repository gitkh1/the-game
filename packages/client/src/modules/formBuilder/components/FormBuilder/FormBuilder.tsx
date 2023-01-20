import { useMemo, useEffect, MutableRefObject } from 'react';
import { E_FormMode, T_FormStructure } from '../../types';
import { FieldBuilder } from '../FieldBuilder';
import { CustomLink } from '../../../../components/CustomLink';
import { Box, Typography, Button } from '@mui/material';
import { useForm, SubmitHandler, FormProvider, UseFormReturn } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import classes from './FormBuilder.module.scss';
import { LabledFiledInput } from '../LabledFiledInput';

type T_Props<T_Data, T_Schema> = {
  mode?: E_FormMode;
  structure: T_FormStructure;
  validationSchema?: T_Schema;
  onSubmit?: (data: T_Data) => void;
  getFormApi?: (api: UseFormReturn) => void;
  values?: T_Data;
  isEditableAvatar?: boolean;
  formRef?: MutableRefObject<HTMLFormElement | null>;
};

export const FormBuilder = <T_Data extends FieldValues = FieldValues, T_Schema extends AnyObjectSchema = AnyObjectSchema>({
  mode = E_FormMode.Edit,
  structure,
  validationSchema,
  onSubmit,
  getFormApi,
  values,
  isEditableAvatar = false,
  formRef,
}: T_Props<T_Data, T_Schema>) => {
  const formApi = useForm<T_Data>({
    resolver: validationSchema && yupResolver(validationSchema),
  });

  useEffect(() => {
    if (getFormApi) getFormApi(formApi as UseFormReturn);
  }, []);

  const isEdit = useMemo(() => mode === E_FormMode.Edit, [mode]);

  const onFormSubmit: SubmitHandler<T_Data> = (data) => onSubmit && onSubmit(data);

  return (
    <FormProvider {...formApi}>
      <Box component="form" onSubmit={formApi.handleSubmit(onFormSubmit)} className={classes.root} ref={formRef}>
        <Box className={classes.root__fields}>
          <LabledFiledInput
            isActive={isEditableAvatar}
            value={values?.avatar} />
        </Box>
        <Typography variant="h4" className={classes.root__title}>
          {structure.title}
        </Typography>
        <Box className={classes.root__fields}>
          {structure.fields.map((item) => (
            <FieldBuilder key={item.id} {...{ ...item, defaultValue: values?.[item.name], disabled: !isEdit }} />
          ))}
        </Box>
        <Box className={classes.root__footer}>
          {structure?.submit?.title ?
            <Button type="submit" variant="contained">
              {structure.submit.title}
            </Button>
            : null}
          {structure.links ?
            structure.links.map(link => <CustomLink key={link.to} to={link.to} title={link.title} />)
            : null}
        </Box>
      </Box>
    </FormProvider >
  );
};

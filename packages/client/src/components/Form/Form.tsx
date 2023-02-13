import { FormEventHandler, MutableRefObject, useEffect } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { AnyObjectSchema } from "yup";

import { CustomLink } from "../CustomLink";

import { FieldBuilder } from "./components/FieldBuilder";
import { T_FormStructure } from "./constants";

import classes from "./Form.module.scss";

type T_Props<T_Data, T_Schema> = {
  disabled?: boolean;
  structure: T_FormStructure;
  validationSchema?: T_Schema;
  onSubmit?: (data: T_Data) => void;
  getFormApi?: (api: UseFormReturn) => void;
  formRef?: MutableRefObject<HTMLFormElement | null>;
};

export const Form = <T_Data extends FieldValues = FieldValues, T_Schema extends AnyObjectSchema = AnyObjectSchema>({
  disabled,
  structure,
  validationSchema,
  onSubmit,
  getFormApi,
  formRef,
}: T_Props<T_Data, T_Schema>) => {
  const formApi = useForm<T_Data>({
    resolver: validationSchema && yupResolver(validationSchema),
  });

  useEffect(() => {
    if (getFormApi) getFormApi(formApi as UseFormReturn);
  }, []);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void formApi.handleSubmit((data) => onSubmit?.(data))(event);
  };

  return (
    <FormProvider {...formApi}>
      <Box component="form" onSubmit={onFormSubmit} className={classes.root} ref={formRef}>
        <Typography variant="h4" className={classes.root__title}>
          {structure.title}
        </Typography>
        <Box className={classes.root__fields}>
          {structure.fields.map((item) => (
            <FieldBuilder
              key={item.id}
              field={{
                ...item,
                disabled,
              }}
            />
          ))}
        </Box>
        <Box className={classes.root__footer}>
          {structure?.submit?.title ? (
            <Button type="submit" variant="contained">
              {structure.submit.title}
            </Button>
          ) : null}
          {!!structure.links && structure.links.map((link) => <CustomLink key={link.to} to={link.to} title={link.title} />)}
        </Box>
      </Box>
    </FormProvider>
  );
};

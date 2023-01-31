import { MutableRefObject, useEffect, useMemo } from "react";
import { FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import { AnyObjectSchema } from "yup";

import { CustomLink } from "../../../../components/CustomLink";
import { E_FormMode, T_FormStructure } from "../../types";
import { FieldBuilder } from "../FieldBuilder";
import { LabledFiledInput } from "../LabledFiledInput";

import classes from "./FormBuilder.module.scss";

type T_Props<T_Data, T_Schema> = {
  mode?: E_FormMode;
  structure: T_FormStructure;
  validationSchema?: T_Schema;
  onSubmit?: (data: T_Data) => void;
  getFormApi?: (api: UseFormReturn) => void;
  values?: T_Data | null;
  isEditableAvatar?: boolean;
  displayAvatar?: boolean;
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
  displayAvatar = true,
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
      <Box component="form" onSubmit={(data) => void formApi.handleSubmit(onFormSubmit)(data)} className={classes.root} ref={formRef}>
        <Box className={classes.root__fields}>
          {displayAvatar && typeof values?.avatar === "string" ? <LabledFiledInput isActive={isEditableAvatar} value={values?.avatar} /> : null}
        </Box>
        <Typography variant="h4" className={classes.root__title}>
          {structure.title}
        </Typography>
        <Box className={classes.root__fields}>
          {structure.fields.map((item) => {
            let defaultValue = "";
            if (typeof values?.[item.name] === "string") {
              defaultValue += values[item.name];
            }
            return (
              <FieldBuilder
                key={item.id}
                {...{
                  ...item,
                  defaultValue,
                  disabled: !isEdit,
                }}
              />
            );
          })}
        </Box>
        <Box className={classes.root__footer}>
          {structure?.submit?.title ? (
            <Button type="submit" variant="contained">
              {structure.submit.title}
            </Button>
          ) : null}
          {structure.links ? structure.links.map((link) => <CustomLink key={link.to} to={link.to} title={link.title} />) : null}
        </Box>
      </Box>
    </FormProvider>
  );
};

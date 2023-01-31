import { MutableRefObject } from "react";

import { FORM_FIELDS } from "../constants";

export type T_FormFieldNames = Array<keyof typeof FORM_FIELDS>;

export type T_FormStructure = {
  title: string;
  fields: T_FormField[];
  links?: T_FormLink[];
  submit?: T_FromSubmit;
};

export type T_FormField = {
  id: string;
  type: E_FormFieldType;
  name: string;
  label: string;
  value?: string;
  defaultValue?: string;
  mask?: string;
  disabled?: boolean;
};

export type T_FormLink = {
  to: string;
  title: string;
};

export type T_FromSubmit = {
  title: string;
};

export type T_LabledFiledInput = {
  isActive: boolean;
  value: string;
  fileRef?: MutableRefObject<HTMLInputElement | null>;
};

export enum E_FormFieldType {
  Text = "text",
  Password = "password",
}

export enum E_FormMode {
  Edit = "edit",
  View = "view",
}

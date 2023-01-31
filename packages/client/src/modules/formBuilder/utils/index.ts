import { FORM_FIELDS } from "../constants";

export function getFormFields(fields: Array<keyof typeof FORM_FIELDS>) {
  return fields.map((field) => FORM_FIELDS[field]);
}

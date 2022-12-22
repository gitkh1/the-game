import { FORM_FIELDS } from '../constants'

type T_FieldNames = keyof typeof FORM_FIELDS

export function getFormFields(fields: T_FieldNames[]) {
  return fields.map(field => FORM_FIELDS[field])
}

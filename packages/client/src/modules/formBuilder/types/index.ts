export type TFormScheme = TFormSchemeItem[]

export type TFormSchemeItem = {
  id: string
  type: EFormFieldType
  name: string
  label: string
  defaultValue?: string
}

export type TFormLink = {
  to: string
  title: string
}

export enum EFormFieldType {
  Text = 'text',
  Password = 'password',
}

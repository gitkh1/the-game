export type T_FormStructure = {
  title: string;
  fields: T_FormField[];
  link?: T_FormLink;
  submit: T_From_Submit;
};

export type T_FormField = {
  id: string;
  type: E_FormFieldType;
  name: string;
  label: string;
  defaultValue?: unknown;
  mask?: string;
  disabled?: boolean;
};

export type T_FormLink = {
  to: string;
  title: string;
};

export type T_From_Submit = {
  title: string;
};

export enum E_FormFieldType {
  Text = 'text',
  Password = 'password',
}

export enum E_FormMode {
  Edit = 'edit',
  View = 'view',
}

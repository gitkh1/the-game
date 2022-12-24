import * as yup from 'yup';
import { PHONE_CHARS, REG_EX } from './regEx';

yup.addMethod<yup.StringSchema>(yup.string, 'mail', function fn() {
  return this.required().trim().email();
});
yup.addMethod<yup.StringSchema>(yup.string, 'login', function fn() {
  return this.required().min(3).max(20).matches(REG_EX.login);
});
yup.addMethod<yup.StringSchema>(yup.string, 'name', function fn() {
  return this.required().matches(REG_EX.name);
});
yup.addMethod<yup.StringSchema>(yup.string, 'phone', function fn() {
  return this.required()
    .min(10)
    .max(15)
    .transform((value: string) => {
      const phone = value.replaceAll(PHONE_CHARS, '');
      return Number(phone) ? phone : null;
    });
});
yup.addMethod<yup.StringSchema>(yup.string, 'password', function fn() {
  return this.required().min(8).max(40).matches(REG_EX.password);
});
yup.addMethod<yup.StringSchema>(yup.string, 'confirmPassword', function fn() {
  return this.required().oneOf([yup.ref('password')]);
});

declare module 'yup' {
  interface StringSchema extends yup.BaseSchema {
    mail(): StringSchema;
    login(): StringSchema;
    name(): StringSchema;
    phone(): StringSchema;
    password(): StringSchema;
    confirmPassword(): StringSchema;
  }
}

export { yup };

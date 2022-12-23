import * as yup from 'yup'
import { REG_EX } from './regEx'

yup.addMethod<yup.StringSchema>(yup.string, 'login', function fn() {
  return this.min(3).max(20).matches(REG_EX.login)
})
yup.addMethod<yup.StringSchema>(yup.string, 'password', function fn() {
  return this.min(8).max(40).matches(REG_EX.password)
})
yup.addMethod<yup.StringSchema>(yup.string, 'name', function fn() {
  return this.matches(REG_EX.name)
})
yup.addMethod<yup.NumberSchema>(yup.number, 'phone', function fn() {
  return this.integer()
    .positive()
    .transform(value => {
      const { length } = String(value)
      return length > 9 && length < 16 ? value : null
    })
})

declare module 'yup' {
  interface StringSchema extends yup.BaseSchema {
    login(): StringSchema
    password(): StringSchema
    name(): StringSchema
  }
  interface NumberSchema extends yup.BaseSchema {
    phone(): NumberSchema
  }
}

export { yup }

export const REG_EX = {
  name: /^[A-ZА-Я]+[a-zа-яA-ZА-Я]+([-]?)+[a-zа-яA-ZА-Я]+/,
  login: /(\d?)+([-|_]?)+[a-zA-z]+([-|_]?)+[a-zA-z]+(\d?)+/,
  password: /^(?=.*\d)(?=.*[A-Z])\w+/,
}
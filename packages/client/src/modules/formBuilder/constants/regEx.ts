export const REG_EX = {
  name: /^[A-ZА-Я]+[a-zа-яA-ZА-Я]+([-]?)+[a-zа-яA-ZА-Я]+/,
  login: /(\d?)+([-|_]?)+[a-zA-z]+([-|_]?)+[a-zA-z]+(\d?)+/,
  email: /^[\w]+@([\d]?|[a-z]+\.)+[\w-]{2,4}$/,
  password: /^(?=.*\d)(?=.*[A-Z])\w{8,40}$/i,
  phone: /^\+?\d{10,15}$/,
}

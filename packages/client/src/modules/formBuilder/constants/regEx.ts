export const REG_EX = {
  name: /^[A-ZА-Я]+[a-zA-Zа-яА-Я]+([-]?)+[a-zA-Zа-яА-Я]+/,
  login: /^(\d?)+(-|_?)+[a-zA-Z]+(-|_?)+[a-zA-Z]+(\d?)+$/,
  password: /^(?=.*\d)(?=.*[A-Z])\w+/,
};

export const PHONE_CHARS = /\+|\(|\)|-/g;

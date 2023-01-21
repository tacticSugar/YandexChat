export const validator: Record<string, (str: string, pass?: string) => false | string> = {
  name(str) {
    if (str.length === 0) return 'Поле обязательно к заполнению';
    const firstLetter = str[0];
    const restLetter = str;
    if (!/[A-ZА-Я]/.test(firstLetter)) return 'Попробуйте начать с заглавной буквы';
    if (!/^([а-яА-ЯёЁa-zA-Z-])*$/.test(restLetter)) return 'Допустимы только буквы и дефис';
    return false;
  },
  login(str) {
    if (str.length === 0) return 'Поле обязательно к заполнению';
    if (str.length < 3) return 'Не менее трёх символов';
    if (str.length > 20) return 'Не более 20 символов';
    if (!/^[0-9a-zA-Z-_]+$/.test(str)) return 'Допустимы цифры, буквы, тире и нижнее тире';
    if (/^[0-9]+$/.test(str)) return 'Буквы тоже нужны';
    return false;
  },
  email(str) {
    if (str.length === 0) return 'Поле обязательно к заполнению';
    if (!/^[a-zA-Z0-9._%$#+-]+@[a-z0-9]*[a-z]+[a-z]*?\.[a-zA-Z]+$/.test(str)) {
      return 'Некорректный email';
    }
    return false;
  },
  password(str) {
    if (str.length === 0) return 'Поле обязательно к заполнению';
    if (str.length < 8) return 'Не менее 8 символов';
    if (str.length > 40) return 'Не более 40 символов';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(str)) return 'Должны быть хотя бы одна цифра и заглавная буква';
    return false;
  },
  confirmPass(str, pass = '') {
    if (str.length === 0) return 'Поле обязательно к заполнению';
    if (str !== pass) return 'Не совпадает';
    return false;
  },
  phone(str) {
    if (str.length === 0) return 'Поле обязательно к заполнению';
    if (str.length < 10) return 'Не менее 10 цифр';
    if (str.length > 15) return 'Не более 15 цифр';
    if (!/^(([0-9]|\+))?[0-9]+$/.test(str)) return 'Введите корректный телефон';
    return false;
  },
  message(str) {
    if (str.length === 0) return 'Нечего отправлять';
    return false;
  },
  second_name(str) {
    return this.name(str);
  },
  first_name(str) {
    return this.name(str);
  },
  display_name(str) {
    return this.name(str);
  },
  oldPass(str) {
    return this.password(str);
  },
  avatar(str) {
    if (str.length === 0) return 'Нужно выбрать файл';
    return false;
  },
  new_chat(str) {
    if (str.length === 0) return 'Название не может быть пустым';
    return false;
  },
  add_user_to_chat(str) {
    return this.login(str);
  },
  del_user_from_chat(str) {
    return this.login(str);
  },
};

import { SignInData } from '../../api/AuthApi/AuthTypes';
import { Form } from '../../components/form';
import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import template from './signIn.pug';

export class SignIn extends Block {
  static labels = [
    { login: 'Логин' },
    { password: 'Пароль' },
  ];

  static inputsMetaData = [
    {
      id: 'login',
      name: 'login',
      type: 'text',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
    },
  ];

  constructor() {
    super('section');
    this.element?.classList.add('signIn');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const data = (this.children.loginForm as Form).getData();
    if (data) {
      AuthController.signIn(data as unknown as SignInData);
    }
  }

  init() {
    this.children.loginForm = new Form({
      button: 'Авторизоваться',
      title: 'Вход',
      redirect: '/sign-up',
      redirectTitle: 'Нет аккаунта?',
      inputsMetaData: SignIn.inputsMetaData,
      labels: SignIn.labels,
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

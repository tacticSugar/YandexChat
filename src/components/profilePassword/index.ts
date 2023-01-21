import Block from '../../utils/Block';
import template from './profilePassword.pug';
import { Form } from '../form';
import UserController from '../../controllers/UserController';
import { PasswordUpdateData } from '../../api/UserApi/UserApiTypes';

export class ProfilePassword extends Block {
  static labels = [
    { oldPass: 'Старый пароль' },
    { password: 'Новый пароль' },
    { confirmPass: 'Повторите новый пароль' },
  ];

  static inputs = [{
    id: 'oldPass',
    name: 'oldPass',
    type: 'password',
  }, {
    id: 'password',
    name: 'password',
    type: 'password',
  }, {
    id: 'confirmPass',
    name: 'confirmPass',
    type: 'password',
  }];

  constructor() {
    super('section');
    this.element?.classList.add('profile_password');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const data = (this.children.password_form as Form).getData();

    if (data) {
      const result: PasswordUpdateData = {
        newPassword: data.password,
        oldPassword: data.oldPass,
      };

      UserController.updatePassword(result);
    }
  }

  init() {
    this.children.password_form = new Form({
      inputsMetaData: ProfilePassword.inputs,
      labels: ProfilePassword.labels,
      button: 'Сохранить',
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

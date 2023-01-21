import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import { Link } from '../link';
import template from './profileControl.pug';

export class ProfileControl extends Block {
  constructor() {
    super('div');
    this.element?.classList.add('profile_control');
  }

  init() {
    this.children.change = new Link({
      title: 'Изменить данные',
      url: '/settings/change',
      className: 'profile_control__item',
    });
    this.children.password = new Link({
      title: 'Изменить пароль',
      url: '/settings/password',
      className: 'profile_control__item',
    });
    this.children.exit = new Link({
      title: 'Выйти',
      events: {
        click: () => AuthController.logout(),
      },
      className: ['profile_control__item', 'red-text'],
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

import Block from '../../utils/Block';
import template from './profileEdit.pug';
import { Form } from '../form';
import { withStore } from '../../store/WithStore';
import UserController from '../../controllers/UserController';
import { UserUpdateData } from '../../api/UserApi/UserApiTypes';
import { UserI } from '../../typings';

export type ProfileEditBaseProps = Omit<UserI, 'id | password | avatar'>;

class ProfileEditBase extends Block<ProfileEditBaseProps> {
  static labels = [
    { email: 'Почта' },
    { login: 'Логин' },
    { first_name: 'Имя' },
    { second_name: 'Фамилия' },
    { display_name: 'Имя в чате' },
    { phone: 'Телефон' },
  ];

  static inputs = [{
    id: 'email',
    name: 'email',
    type: 'email',
  }, {
    id: 'login',
    name: 'login',
    type: 'text',
  }, {
    id: 'first_name',
    name: 'first_name',
    type: 'first_name',
  }, {
    id: 'second_name',
    name: 'second_name',
    type: 'second_name',
  }, {
    id: 'display_name',
    name: 'display_name',
    type: 'text',
  }, {
    id: 'phone',
    name: 'phone',
    type: 'phone',
  }];

  constructor(props: ProfileEditBaseProps) {
    super('section', props);
    this.element?.classList.add('profile_edit');
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const dataSub = (this.children.form as Form).getData();

    if (dataSub) {
      UserController.updateProfile(dataSub as unknown as UserUpdateData);
    }
  }

  init() {
    this.children.form = new Form({
      inputsMetaData: ProfileEditBase.inputs,
      labels: ProfileEditBase.labels,
      button: 'Сохранить',
      data: {
        email: this.props.email,
        login: this.props.login,
        first_name: this.props.first_name,
        second_name: this.props.second_name,
        display_name: this.props.display_name,
        phone: this.props.phone,
      },
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfileEdit = withUser(ProfileEditBase);

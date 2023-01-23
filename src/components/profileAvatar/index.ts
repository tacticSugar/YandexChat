import UserController from '../../controllers/UserController';
import { withStore } from '../../store/WithStore';
import Block from '../../utils/Block';
import { ModalWindow } from '../modalWindow';
import template from './profileAvatar.pug';

export interface ProfileAvatarProps {
  name?: string,
  avatar: string | null,
  isOpenModal?: boolean,
  events?: {
    click: () => void,
  }
}

export class ProfileAvatarBase extends Block<ProfileAvatarProps> {
  static input = [{
    id: 'avatar',
    name: 'avatar',
    type: 'file',
  }];

  constructor(props: ProfileAvatarProps) {
    super('div', props);
    this.element?.classList.add('profile_avatar');
    this.setProps({
      isOpenModal: false,
      events: {
        click: this.openCloseModal.bind(this),
      },
    } as ProfileAvatarProps);
  }

  openCloseModal() {
    this.setProps({
      isOpenModal: !this.props.isOpenModal,
    } as ProfileAvatarProps);
    if (this.props.isOpenModal) {
      (this.children.modal as Block).show('flex');
    } else {
      (this.children.modal as Block).hide();
    }
  }

  submit(file: File) {
    const data = new FormData();

    if (file) {
      data.append('avatar', file);
      UserController.updateAvatar(data);

      // MEMORY: добавить обработку ошибок и изменение вью на них

      this.openCloseModal();
    }
  }

  init() {
    this.children.modal = new ModalWindow({
      title: 'Загрузите файл',
      button: 'Поменять',
      className: 'modalWindow',
      submitFile: this.submit.bind(this),
      inputsMetaData: ProfileAvatarBase.input,
      labels: [{
        avatar: 'Выбрать файл на компьютере',
      }],
    });

    (this.children.modal as Block).hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ avatar: state.user.avatar }));

export const ProfileAvatar = withUser(ProfileAvatarBase);

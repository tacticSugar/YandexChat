import Block from '../../utils/Block';
import template from './contactHead.pug';
import { Search } from '../search';
import { Link } from '../link';
import { Button } from '../button';
import { ModalWindow } from '../modalWindow';
import ChatsController from '../../controllers/ChatsController';
import logger from '../../utils/logger';

interface ContactHeadProps {
  isOpenModal?: boolean,
}

export class ContactHead extends Block {
  constructor(props: ContactHeadProps) {
    super('div', props);
    this.element?.classList.add('contactList_head');
    this.setProps({
      isOpenModal: false,
    });
  }

  createChat(data: Record<string, string>) {
    ChatsController.createChat(data.new_chat);
    this.closeModal();
  }

  openModal() {
    this.setProps({
      isOpenModal: true,
    });
    (this.children.modal as Block).show('flex');
  }

  closeModal() {
    this.setProps({
      isOpenModal: false,
    });
    (this.children.modal as Block).hide();
  }

  init() {
    this.children.search = new Search({
      events: {
        change: this.change.bind(this),
      },
    });

    this.children.buttonNewChat = new Button({
      title: 'Новый чат',
      className: 'contactList_head_navi__newChat',
      events: {
        click: this.openModal.bind(this),
      },
    });

    this.children.profileLink = new Link({
      title: 'Профиль >',
      url: '/settings',
      className: 'contactList_head_navi__transit',
    });

    this.children.modal = new ModalWindow({
      title: 'Новый чат',
      button: 'Создать',
      className: 'modalWindow',
      labels: [{
        new_chat: 'Имя чата',
      }],
      inputsMetaData: [{
        id: 'new_chat',
        name: 'new_chat',
        type: 'text',
      }],
      submitData: this.createChat.bind(this),
      close: this.closeModal.bind(this),
    });

    (this.children.modal as Block).hide();
  }

  change() {
    const data = (this.children.search as Search).getData();
    logger.log(data); // MEMORY: переделат под нормальную выдачу в лист чатов
  }

  render() {
    return this.compile(template, this.props);
  }
}

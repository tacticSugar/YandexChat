import Block from '../../../utils/Block';
import template from './chatWindowHead.pug';
import { PopupWindow } from '../../popupWindow';
import { PopupWindowButton } from '../../popupWindowButton';
import itemMenuAdd from '../../../../static/itemMenuAdd.png';
import itemMenuDel from '../../../../static/itemMenuDel.png';
import itemMenuDelChat from '../../../../static/itemMenuDelChat.svg';
import ChatsController from '../../../controllers/ChatsController';
import { isEqual } from '../../../utils/helpers';
import { ModalWindow } from '../../modalWindow';
// MEMORY: в следующей версии настроить абсолютные импорты

export interface ChatWindowHeadProps {
  chatName: string,
  chatId: number | null,
  contactImg?: string,
}

export class ChatWindowHead extends Block<ChatWindowHeadProps> {
  private isActiveMenu = false;

  constructor(props: ChatWindowHeadProps) {
    super('div', props);
    this.element?.classList.add('chat_window_head');
  }

  private onClickMenu() {
    this.isActiveMenu = !this.isActiveMenu;
    (this.children.menu as Block).setProps({ isActive: this.isActiveMenu });
    (this.children.popupWindow as Block)[this.isActiveMenu ? 'show' : 'hide']();
  }

  private deleteChat() {
    if (this.props.chatId) {
      ChatsController.deleteChat(this.props.chatId);
    }
  }

  private openModalAddUserToChat() {
    (this.children.modalAddUserToChat as ModalWindow).show('flex');
  }

  private addUserToChat(data: Record<'add_user_to_chat', string>) {
    const { add_user_to_chat } = data;
    if (this.props.chatId) {
      ChatsController.addUsersToChat({ chatId: this.props.chatId, login: add_user_to_chat });
    }
    this.onClickMenu();
    this.closeModalAddUserToChat();
  }

  private closeModalAddUserToChat() {
    (this.children.modalAddUserToChat as Block).hide();
  }

  private openModalDelUserFromChat() {
    (this.children.modalDelUserFromChat as ModalWindow).show('flex');
  }

  private delUserFromChat(data: Record<'del_user_from_chat', string>) {
    const { del_user_from_chat } = data;
    if (this.props.chatId) {
      ChatsController.deleteUsersFromChat({ chatId: this.props.chatId, login: del_user_from_chat });
    }
    this.onClickMenu();
    this.closeModalDelUserFromChat();
  }

  private closeModalDelUserFromChat() {
    (this.children.modalDelUserFromChat as Block).hide();
  }

  init() {
    this.children.menu = new PopupWindowButton({
      isActive: false,
      classButton: 'chat_window_head__options',
      classActiveButton: 'active',
      events: {
        click: this.onClickMenu.bind(this),
      },
    });

    this.children.popupWindow = new PopupWindow({
      right: 0,
      bottom: -140,
      menuItems: [{
        image: itemMenuAdd,
        title: 'Добавить пользователя',
        events: { click: this.openModalAddUserToChat.bind(this) },
      }, {
        image: itemMenuDel,
        title: 'Удалить пользователя',
        events: { click: this.openModalDelUserFromChat.bind(this) },
      }, {
        image: itemMenuDelChat,
        title: 'Удалить чат',
        events: { click: () => this.deleteChat() },
      }],
    });

    this.children.modalAddUserToChat = new ModalWindow({
      title: 'Добавить пользователя',
      button: 'Добавить',
      className: 'modalWindow',
      close: this.closeModalAddUserToChat.bind(this),
      submitData: this.addUserToChat.bind(this),
      inputsMetaData: [{
        id: 'add_user_to_chat',
        name: 'add_user_to_chat',
        type: 'text',
      }],
      labels: [{
        add_user_to_chat: 'Логин',
      }],
    });

    this.children.modalDelUserFromChat = new ModalWindow({
      title: 'Удалить пользователя',
      button: 'Удалить',
      className: 'modalWindow',
      close: this.closeModalDelUserFromChat.bind(this),
      submitData: this.delUserFromChat.bind(this),
      inputsMetaData: [{
        id: 'del_user_from_chat',
        name: 'del_user_from_chat',
        type: 'text',
      }],
      labels: [{
        del_user_to_chat: 'Логин',
      }],
    });

    this.children.modalDelUserFromChat.hide();
    this.children.modalAddUserToChat.hide();
    this.children.popupWindow.hide();
  }

  protected componentDidUpdate(
    oldProps: ChatWindowHeadProps,
    newProps: ChatWindowHeadProps,
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.isActiveMenu = false;
      (this.children.popupWindow as Block).hide();
      return true;
    }

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

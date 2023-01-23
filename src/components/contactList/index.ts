import Block from '../../utils/Block';
import template from './contactList.pug';
import { Contact, ContactProps } from './contact';
import { ChatI } from '../../typings';
import { withStore } from '../../store/WithStore';
import ChatsController from '../../controllers/ChatsController';

type ContactListProps = {
  chats: ChatI[],
  currentChatId: number | null
}

export class ContactListBase extends Block<ContactListProps> {
  constructor(props: ContactListProps) {
    super('div', props);
    this.element?.classList.add('contactList');
  }

  setCurrentChat(id: number) {
    ChatsController.toGoToChatById(id);
  }

  init() {
    if (this.props.chats) {
      this.children.contacts = this.props.chats?.map((contactData: ChatI) => {
        const {
          title, avatar, id, unread_count, last_message,
        } = contactData;
        return new Contact({
          title,
          avatar,
          id,
          unread_count,
          message: last_message?.content,
          time: last_message?.time,
          user_name: last_message?.user.first_name,
          isActive: false,
          events: {
            click: () => this.setCurrentChat(id),
          },
        });
      });
    }
  }

  protected componentDidUpdate(oldProps: ContactListProps, newProps: ContactListProps): boolean {
    if (oldProps.currentChatId !== newProps.currentChatId) {
      (this.children.contacts as Block[]).forEach((contact) => {
        const id = (contact as Contact).getId();
        if (oldProps.currentChatId === id) {
          (contact as Contact).setProps({ isActive: false } as ContactProps);
        } else if (newProps.currentChatId === id) {
          (contact as Contact).setProps({ isActive: true } as ContactProps);
        }
      });
      return true;
    }

    if ((!oldProps.chats && newProps.chats) || oldProps.chats.length !== newProps.chats.length) {
      if (newProps.chats) {
        this.children.contacts = newProps.chats?.map((contactData: ChatI) => {
          const {
            title, avatar, id, unread_count, last_message,
          } = contactData;
          return new Contact({
            title,
            avatar,
            id,
            unread_count,
            message: last_message?.content,
            time: last_message?.time,
            user_name: last_message?.user.first_name,
            isActive: id === newProps.currentChatId,
            events: {
              click: () => this.setCurrentChat(id),
            },
          });
        });
      }

      return true;
    }

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  currentChatId: state.currentChatId,
}));

export const ContactList = withChats(ContactListBase);

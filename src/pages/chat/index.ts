import { ChatWindow } from '../../components/chatWindow';
import { ContactHead } from '../../components/contactHead';
import { ContactList } from '../../components/contactList';
import Block from '../../utils/Block';
import template from './chat.pug';

export class Chat extends Block {
  constructor() {
    super('main');
    this.element?.classList.add('chat');
  }

  init() {
    this.children.head = new ContactHead({});

    this.children.window = new ChatWindow({});

    this.children.contactList = new ContactList({});
  }

  render() {
    return this.compile(template, this.props);
  }
}

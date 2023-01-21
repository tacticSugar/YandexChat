import ChatsController from '../../controllers/ChatsController';
import MessageController from '../../controllers/MessageController';
import { withStore } from '../../store/WithStore';
import { ChatI } from '../../typings';
import Block from '../../utils/Block';
import { isEqual } from '../../utils/helpers';
import template from './chatWindow.pug';
import { ChatWindowContent, ChatWindowContentProps } from './chatWindowContent';
import { ChatWindowForm } from './chatWindowForm';
import { ChatWindowHead, ChatWindowHeadProps } from './chatWindowHead';

export interface ChatWindowProps {
  userId: number,
  chat: ChatI | undefined,
  currentChatId: number | null,
}

export class ChatWindowBase extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super('section', props);
    this.element?.classList.add('chat_window');
    const chatId = ChatsController.checkAndSetParameterInRoute();
    this.setProps({ currentChatId: Number(chatId) } as ChatWindowProps);
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    const form = this.children.form as ChatWindowForm;
    const message = form.getData();
    if (this.props.currentChatId && !!message) {
      MessageController.sendMessage({ type: 'message', content: message }, this.props.currentChatId);
    }
  }

  init() {
    this.children.head = new ChatWindowHead({
      chatName: this.props.chat?.title ?? 'Unknown',
      chatId: this.props.currentChatId,
    });

    this.children.content = new ChatWindowContent({
      userId: this.props.userId,
    } as ChatWindowContentProps);

    this.children.form = new ChatWindowForm({
      events: {
        submit: this.submit.bind(this),
      },
    });
  }

  protected componentDidUpdate(oldProps: ChatWindowProps, newProps: ChatWindowProps): boolean {
    if (oldProps.currentChatId !== newProps.currentChatId && newProps.currentChatId) {
      MessageController.connect(this.props.userId, newProps.currentChatId);

      (this.children.head as ChatWindowHead).setProps({
        chatId: newProps.currentChatId,
      } as ChatWindowHeadProps);
      return true;
    } if ((newProps.chat && !oldProps.chat)
    || (newProps.chat && oldProps.chat && !isEqual(newProps.chat, oldProps.chat))) {
      (this.children.head as ChatWindowHead).setProps({
        chatName: newProps.chat.title,
      } as ChatWindowHeadProps);
      return true;
    } if (!!oldProps.currentChatId && !newProps.currentChatId) {
      (this.children.head as ChatWindowHead).setProps({ chatName: '', chatId: null });
      return true;
    }

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChat = withStore((state) => ({
  userId: state.user.id,
  chat: state.chats.find(({ id }) => id === state.currentChatId),
  currentChatId: state.currentChatId,
}));

export const ChatWindow = withChat(ChatWindowBase);

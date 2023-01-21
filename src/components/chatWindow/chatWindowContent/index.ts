import Block from '../../../utils/Block';
import { withStore } from '../../../store/WithStore';
import { EventElement, MessageI } from '../../../typings';
import { debounce, isEqual } from '../../../utils/helpers';
import { Message } from '../../message';
import template from './chatWindowContent.pug';
import MessageController from '../../../controllers/MessageController';

export interface ChatWindowContentProps {
  currentChatId: number,
  messages: MessageI[],
  userId: number,
  events: {
    scroll: (e: EventElement, chatId: number) => void,
  }
}

export class ChatWindowContentBase extends Block<ChatWindowContentProps> {
  constructor(props: ChatWindowContentProps) {
    super('div', props);
    this.setProps({
      events: {
        scroll: debounce(this.checkPosition.bind(this), 300),
      },
    } as unknown as ChatWindowContentProps);
    this.element?.classList.add('chat_window_content');
  }

  init() {
    if (this.props.messages) {
      this.children.messages = this.props.messages
        .map(({ content, time, user_id }: MessageI) => new Message({
          content,
          time,
          isMyMess: user_id === this.props.userId,
        }));
    }
  }

  protected checkPosition(e: EventElement) {
    const height = e.target.scrollHeight;
    const screenHeight = window.innerHeight;
    const threshold = height - screenHeight / 4;

    const scrolled = Math.abs(e.target.scrollTop);

    const position = scrolled + screenHeight;
    if (position >= threshold) {
      MessageController.getOldMessage(this.props.currentChatId);
    }
  }

  protected componentDidUpdate(
    oldProps: ChatWindowContentProps,
    newProps: ChatWindowContentProps,
  ): boolean {
    if (!isEqual(oldProps, newProps) && newProps.messages) {
      this.children.messages = newProps.messages
        .map(({ content, time, user_id }: MessageI) => new Message({
          content,
          time,
          isMyMess: user_id === this.props.userId,
        }));
      return true;
    }

    if (!newProps.messages) {
      this.children.messages = [];
      return true;
    }

    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChat = withStore((state) => ({
  currentChatId: state.currentChatId,
  messages: state.currentChatId && state.messages ? state.messages[state.currentChatId] : [],
}));

export const ChatWindowContent = withChat(ChatWindowContentBase);

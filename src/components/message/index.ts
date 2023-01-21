import Block from '../../utils/Block';
import template from './message.pug';

interface MessageProps {
  content: string,
  time: string,
  isMyMess: boolean,
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super('article', props);
    this.element?.classList.add('message');
    this.element?.classList.toggle('message_my', props.isMyMess);
  }

  render() {
    return this.compile(template, this.props);
  }
}

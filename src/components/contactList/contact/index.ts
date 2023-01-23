import Block from '../../../utils/Block';
import template from './contact.pug';

export interface ContactProps {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  user_name?: string | null,
  time?: string | null,
  message?: string | null,
  isActive: boolean,
  events: {
    click: () => void
  }
}

export class Contact extends Block<ContactProps> {
  constructor(props: ContactProps) {
    super('div', props);
    this.element?.classList.add('contact');
    if (this.props.isActive) {
      this.element?.classList.add('contact_active');
    }
  }

  getId() {
    return this.props.id;
  }

  protected componentDidUpdate(oldProps: ContactProps, newProps: ContactProps): boolean {
    if (oldProps.isActive !== newProps.isActive) {
      this.element?.classList.toggle('contact_active', newProps.isActive);
      return true;
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

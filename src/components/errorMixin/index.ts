import Block from '../../utils/Block';
import { Link } from '../link';
import template from './errorMixin.pug';

interface ErrorMixinProps {
  error: string,
  descript: string
}

export class ErrorMixin extends Block<ErrorMixinProps> {
  constructor(props: ErrorMixinProps) {
    super('section', props);
    this.element?.classList.add('error');
  }

  init() {
    this.children.back = new Link({
      title: 'Назад к чатам',
      url: '/messenger',
      className: 'error_back',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

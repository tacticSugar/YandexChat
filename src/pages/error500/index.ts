import { ErrorMixin } from '../../components/errorMixin';
import Block from '../../utils/Block';
import template from './error500.pug';

export class Error500 extends Block {
  constructor() {
    super('section');
    this.element?.classList.add('error');
  }

  init() {
    this.children.errorMixin = new ErrorMixin({
      descript: 'Мы уже фиксим',
      error: '500',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

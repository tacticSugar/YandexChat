import { ErrorMixin } from '../../components/errorMixin';
import Block from '../../utils/Block';
import template from './error404.pug';

export class Error404 extends Block {
  constructor() {
    super('section');
    this.element?.classList.add('error');
  }

  init() {
    this.children.errorMixin = new ErrorMixin({
      descript: 'Не туда попали',
      error: '404',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

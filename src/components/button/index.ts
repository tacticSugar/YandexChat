import Block from '../../utils/Block';
import template from './button.pug';

interface ButtonProps {
  title: string,
  className: string,
  events: {
    click: () => void,
  }
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
    this.element?.classList.add(props.className);
    this.element?.setAttribute('type', 'button');
  }

  render() {
    return this.compile(template, this.props);
  }
}

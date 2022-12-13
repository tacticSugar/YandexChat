import buttonTemplate from './button.pug';
import { Block } from '../../utils/core/Block';

type ButtonProps = {
  className: string;
  btnText: string;
  events?: Record<string, any>;
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('div', props);
  }

  render() {
    return this.compile(buttonTemplate, {
      className: this.props.className,
      btnText: this.props.btnText,
    });
  }
}

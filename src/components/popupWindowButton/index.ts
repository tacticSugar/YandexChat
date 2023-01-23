import Block from '../../utils/Block';
import template from './popupWindowButton.pug';

interface PopupWindowButtonProps {
  isActive: boolean,
  image?: string,
  classButton: string,
  classActiveButton?: string,
  events: {
    click: () => void;
  }
}

export class PopupWindowButton extends Block<PopupWindowButtonProps> {
  constructor(props: PopupWindowButtonProps) {
    super('button', props);
    const { classButton } = props;
    this.element?.classList.add(classButton);
    this.element?.setAttribute('type', 'button');
  }

  protected componentDidUpdate(
    _oldProps: PopupWindowButtonProps,
    newProps: PopupWindowButtonProps,
  ): boolean {
    if (newProps.isActive && this.props.classActiveButton) {
      this.element?.classList.add(this.props.classActiveButton);
    } else if (this.props.classActiveButton) {
      this.element?.classList.remove(this.props.classActiveButton);
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

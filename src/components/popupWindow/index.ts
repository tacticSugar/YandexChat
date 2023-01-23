import Block from '../../utils/Block';
import template from './popupWindow.pug';
import { PopupWindowItem, PopupWindowItemProps } from './popupWindowItem';

interface PopupWindowProps {
  menuItems: PopupWindowItemProps[],
  right?: number,
  left?: number,
  bottom: number,
}

export class PopupWindow extends Block<PopupWindowProps> {
  constructor(props: PopupWindowProps) {
    super('div', props);

    if (this.element) {
      this.element.classList.add('popup');
      this.element.style.bottom = `${props.bottom}px`;

      if (props.right !== undefined) {
        this.element.style.right = `${props.right}px`;
      }
      if (props.left !== undefined) {
        this.element.style.left = `${props.left}px`;
      }
    }
  }

  init() {
    this.children.items = this.props.menuItems
      .map((popupItemProps: PopupWindowItemProps) => new PopupWindowItem(popupItemProps));
  }

  render() {
    return this.compile(template, this.props);
  }
}

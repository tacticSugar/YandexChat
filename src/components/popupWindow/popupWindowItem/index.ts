import Block from '../../../utils/Block';
import template from './popupWindowItem.pug';

export interface PopupWindowItemProps {
  image: string,
  title: string,
  events: {
    click: () => void
  }
}

export class PopupWindowItem extends Block<PopupWindowItemProps> {
  constructor(props: PopupWindowItemProps) {
    super('div', props);
    this.element?.classList.add('popup_item');
  }

  render() {
    return this.compile(template, this.props);
  }
}

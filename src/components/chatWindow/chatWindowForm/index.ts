import Block from '../../../utils/Block';
import template from './chatWindowForm.pug';
import clip from '../../../../static/clip.png';
import send from '../../../../static/send.svg';
import clipActive from '../../../../static/clipActive.png';
import location from '../../../../static/location.png';
import photoAndVideo from '../../../../static/photoAndVideo.png';
import file from '../../../../static/file.png';
import { Input, InputProps } from '../../input';
import { validator } from '../../../utils/validator';
import { PopupWindowButton } from '../../popupWindowButton';
import { PopupWindow } from '../../popupWindow';
import logger from '../../../utils/logger';

interface ChatWindowFormProps {
  events: {
    submit: (e: SubmitEvent) => void;
  }
}

export class ChatWindowForm extends Block<ChatWindowFormProps> {
  private isActiveMenu = false;

  private static menuItems = [{
    image: photoAndVideo,
    title: 'Фото или Видео',
    // MEMORY: изменим при добавлении функционала в будущих итерациях
    events: { click: () => logger.log('Здесь будет модальное окно отправки фото или видео') },
  }, {
    image: file,
    title: 'Файл',
    // MEMORY: изменим при добавлении функционала в будущих итерациях
    events: { click: () => logger.log('Здесь будет модальное окно отправки файлов') },
  }, {
    image: location,
    title: 'Локация',
    // MEMORY: изменим при добавлении функционала в будущих итерациях
    events: { click: () => logger.log('Здесь будет модальное окно отправки локации') },
  }];

  constructor(props: ChatWindowFormProps) {
    super('form', props);
    this.element?.classList.add('chat_window_form');
  }

  onClickMenu() {
    this.isActiveMenu = !this.isActiveMenu;
    if (!Array.isArray(this.children.menu)) {
      this.children.menu.setProps({
        isActive: this.isActiveMenu,
        image: this.isActiveMenu ? clipActive : clip,
      });
    }
    if (!Array.isArray(this.children.popupWindow)) {
      this.children.popupWindow[this.isActiveMenu ? 'show' : 'hide']();
    }
  }

  isValid() {
    const input = this.children.input as Input;
    const { value } = input.element as HTMLInputElement;

    const validating = validator.message(value);
    if (validating) {
      // eslint-disable-next-line no-console
      logger.log(validating);
      return false;
    }
    return value;
  }

  getData() {
    const validating = this.isValid();
    if (!validating) {
      logger.log(validating);
      return false;
    }
    (this.children.input as Input).setProps({ value: '' } as InputProps);
    return validating;
  }

  init() {
    this.children.input = new Input({
      classInput: 'chat_window_form__input',
      id: 'message',
      name: 'message',
      type: 'text',
      placeholder: 'Сообщение',
      events: {
        blur: this.isValid.bind(this),
        focus: this.isValid.bind(this),
      },
    });

    this.children.menu = new PopupWindowButton({
      isActive: false,
      classButton: 'chat_window_form__clip',
      image: clip,
      events: {
        click: this.onClickMenu.bind(this),
      },
    });

    this.children.popupWindow = new PopupWindow({
      left: -10,
      bottom: 65,
      menuItems: ChatWindowForm.menuItems,
    });
    this.children.popupWindow.hide();
  }

  render() {
    return this.compile(template, { ...this.props, send });
  }
}

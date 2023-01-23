import Block from '../../utils/Block';
import template from './formErrorMessage.pug';

interface FormErrorMessageProps {
  inputId: string,
  message?: string,
}

export class FormErrorMessage extends Block<FormErrorMessageProps> {
  constructor(props: FormErrorMessageProps) {
    super('span', props);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.element!.dataset.for = this.props.inputId;
    if (!props.message) {
      this.hide();
    }
  }

  protected componentDidUpdate(
    _oldProps: FormErrorMessageProps,
    newProps: FormErrorMessageProps,
  ): boolean {
    if (newProps.message) {
      this.show();
    } else {
      this.hide();
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

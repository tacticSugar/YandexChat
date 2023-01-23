import Block from '../../utils/Block';
import template from './form.pug';
import { FormErrorMessage } from '../formErrorMessage';
import { validator } from '../../utils/validator';
import { Input, InputProps } from '../input';
import { Link } from '../link';
import { isEqual } from '../../utils/helpers';

export interface InputsMetaDataI {
  id: string,
  name: string,
  type: string
}

interface FormProps {
  title?: string,
  button?: string,
  inputsMetaData: InputsMetaDataI[],
  redirect?: string,
  redirectTitle?: string,
  labels?: Record<string, string | undefined>[],
  data?: Record<string, string>,
  events: {
    submit: (e: SubmitEvent) => void;
    click?: (e: SubmitEvent) => void;
  }
}

export class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
  }

  protected getErrorBlockByID(id: string) {
    return (this.children.errorsElem as Block[])
      .find((el) => id === el.element?.dataset.for);
  }

  protected getInputElementByID(id: string) {
    return (this.children.inputs as Block[])
      .find((el) => id === el.element?.id)?.element;
  }

  isValid(id: string) {
    const errorElem = this.getErrorBlockByID(id);
    const { value } = this.getInputElementByID(id) as HTMLInputElement;
    let validating;

    if (id === 'confirmPass') {
      const { value: pass } = this.getInputElementByID('password') as HTMLInputElement;
      validating = validator[id](value, pass);
    } else {
      validating = validator[id](value);
    }

    if (validating) {
      errorElem?.setProps({ message: validating });
      return false;
    }

    errorElem?.setProps({ message: '' });
    return value;
  }

  getFile() {
    if (Array.isArray(this.children.inputs)) {
      const { element } = this.children.inputs[0];
      if (element && (element as HTMLInputElement).type === 'file') {
        return (element as HTMLInputElement).files?.[0];
      }
    }
    return false;
  }

  getData() {
    const isValidById: Record<string, boolean> = {};
    const fullData: Record<string, string> = {};

    (this.children.inputs as Block[]).forEach((i) => {
      const { value, id } = (i.element as HTMLInputElement);
      const validating = this.isValid(id);
      if (!validating) {
        isValidById[id] = false;
      } else {
        isValidById[id] = true;
        fullData[id] = value;
      }
    });
    const result = Object.values(isValidById);
    if (result.length > 0 && result.every((i) => i)) {
      (this.children.inputs as Input[]).forEach((input) => {
        input.setProps({ value: '' } as InputProps);
      });
      return fullData;
    }
    return false;
  }

  init() {
    this.children.inputs = this.props.inputsMetaData
      .map((inputData: InputsMetaDataI) => new Input({
        ...inputData,
        value: this.props.data?.[inputData.id],
        events: {
          blur: () => this.isValid(inputData.id),
          focus: () => this.isValid(inputData.id),
        },
      }));
    this.children.errorsElem = this.props.inputsMetaData
      .map(({ id }: InputsMetaDataI) => new FormErrorMessage({
        inputId: id,
      }));
    if (this.props.redirectTitle && this.props.redirect) {
      this.children.link = new Link({
        title: this.props.redirectTitle,
        url: this.props.redirect,
        className: 'link_signIn_Up',
      });
    }
  }

  protected componentDidUpdate(oldProps: FormProps, newProps: FormProps): boolean {
    if (oldProps.data && newProps.data && !isEqual(oldProps.data, newProps.data)) {
      (this.children.inputs as Block[]).forEach((i: Block) => {
        const id = i.element?.id;
        if (id && newProps.data?.[id] !== oldProps.data?.[id]) {
          i.setProps({ value: newProps.data?.[id] });
        }
      });
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

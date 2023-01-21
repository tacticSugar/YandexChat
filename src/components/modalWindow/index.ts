import Block from '../../utils/Block';
import { Button } from '../button';
import { Form, InputsMetaDataI } from '../form';
import template from './modalWindow.pug';

interface ModalWindowProps {
  title: string,
  button: string,
  inputsMetaData: InputsMetaDataI[],
  labels: Record<string, string>[],
  className: string,
  submitFile?: (file: File) => void,
  submitData?: (data: Record<string, string>) => void,
  close?: () => void,
  events?: {
    click?: () => void,
  }
}

export class ModalWindow extends Block<ModalWindowProps> {
  constructor(props: ModalWindowProps) {
    super('div', props);
    this.element?.classList.add(props.className);
  }

  submit(e: SubmitEvent) {
    e.preventDefault();
    if (this.props.submitFile) {
      const file = (this.children.form as Form).getFile();
      if (file) {
        this.props.submitFile(file);
      }
    } else if (this.props.submitData) {
      const data = (this.children.form as Form).getData();
      if (data) {
        this.props.submitData(data);
      }
    }
  }

  init() {
    if (this.props.close) {
      this.children.closeButton = new Button({
        title: 'X',
        className: 'closeButton',
        events: {
          click: this.props.close,
        },
      });
    }
    this.children.form = new Form({
      title: this.props.title,
      button: this.props.button,
      inputsMetaData: this.props.inputsMetaData,
      labels: this.props.labels,
      events: {
        submit: this.submit.bind(this),
        click: (e) => {
          e.stopPropagation();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

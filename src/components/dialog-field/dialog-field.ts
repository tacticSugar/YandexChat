import { Input } from '../input/input';
import './dialog-field.scss';
import dialogTemplate from './dialog-field.pug';
import { Block } from '../../utils/core/Block';
import { connect } from '../../utils/core/HOC';
import { Button } from '../button/button';
import { store } from '../../utils/core/Store';

type DialogFieldProps = {
  currentChat: number;
  idChat: number;
  dialogChosen: boolean;
  inputMessage: Input;
  btnSendMessage: Button;
};

class DialogField extends Block<DialogFieldProps> {
  constructor(props: DialogFieldProps) {
    super('div', {
      ...props,
      idChat: props.currentChat,
      dialogChosen: props.dialogChosen,
      inputMessage: new Input({
        inputClass: 'index-input-message',
        inputType: 'text',
        inputName: 'message',
        inputCheckType: 'chat',
      }),
      btnSendMessage: new Button({
        className: 'index-send-btn',
        btnText: '→',
        events: {
          click: () => {
            const textMessage = (document.querySelector('.index-input-message') as HTMLInputElement)
              .value;
            const socket = store.getState().socket;
            socket.send(
              JSON.stringify({
                content: textMessage,
                type: 'message',
              })
            );
          },
        },
      }),
    });
  }

  render() {
    console.log(this.props);
    return this.compile(dialogTemplate, this.props);
  }
}

function mapToDialog(store: any) {
  let isDialog: boolean = false;
  if (store.currentChat) {
    console.log(store.currentChat);
    isDialog = true;
  }
  let userId = null;
  if (store.user) {
    userId = store.user.id;
  }
  return {
    userId: userId,
    dialogChosen: isDialog,
    currentChat: store.curruntChat || null,
    messageFlow: store.currentDialog || [],
  };
}

const con = connect(mapToDialog);
const dialogField = con(DialogField);
export { dialogField as DialogField };

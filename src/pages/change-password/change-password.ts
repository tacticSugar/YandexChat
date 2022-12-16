import { Block } from '../../utils/core/Block';
import { Input } from '../../components/input/input';
import { SubmitButton } from '../../components/buttonSubmit/buttonSubmit';
import { ButtonBack } from '../../components/buttonBack/buttonBack';
import changeProfTemplate from './change-password.pug';
import './change-password.scss';
import { userController } from '../../controllers/user-controller';
import avatarDefault from '../../static/img/ava.png';
import { connect } from '../../utils/core/HOC';

type ChangePasswordProps = {
  avatar: string;
  btnBack: ButtonBack;
  btnSubmit: SubmitButton;
  inputOldPassword: Input;
  inputNewPassword: Input;
};

class ChangePasswordPage extends Block<ChangePasswordProps> {
  constructor(props: ChangePasswordProps) {
    super('div', {
      ...props,
      btnBack: new ButtonBack(),
      btnSubmit: new SubmitButton({
        text: 'изменить',
        events: {
          click: (event: Event) => {
            event.preventDefault();
            const target = event.target as HTMLElement;
            const form = target.closest('form');
            if (!form) {
              return;
            }
            const pInTemplate: NodeListOf<HTMLParagraphElement> =
              form.querySelectorAll('.input-error');
            for (const p of pInTemplate) {
              if (p.style.display !== 'none') {
                console.log('не все данные валидны!');
                return;
              }
            }
            const inputsInTemplate: NodeListOf<HTMLInputElement> =
              form.querySelectorAll('.inlineText');
            for (const input of inputsInTemplate) {
              console.log(input.value);
            }
            userController.changePassword({
              oldPassword: (form.querySelector('[name="oldPassword"]') as HTMLInputElement)?.value,
              newPassword: (form.querySelector('[name="newPassword"]') as HTMLInputElement)?.value,
            });
          },
        },
      }),
      inputOldPassword: new Input({
        textLabel: 'старый пароль',
        inputClass: 'inlineText',
        inputType: 'password',
        inputName: 'oldPassword',
        inputCheckType: 'password',
      }),
      inputNewPassword: new Input({
        textLabel: 'новый пароль',
        inputClass: 'inlineText',
        inputType: 'password',
        inputName: 'newPassword',
        inputCheckType: 'password',
      }),
    });
  }

  render() {
    return this.compile(changeProfTemplate, { urlIm: this.props.avatar });
  }
}

function mapChangeProfile(store: any) {
  let ava: string;
  if (store.user.avatar) {
    ava = 'https://ya-praktikum.tech/api/v2/resources/' + store.user.avatar;
  } else {
    ava = avatarDefault;
  }
  return {
    avatar: ava,
  };
}

const con = connect(mapChangeProfile);
const changePassword = con(ChangePasswordPage);
export { changePassword as ChangePasswordPage };

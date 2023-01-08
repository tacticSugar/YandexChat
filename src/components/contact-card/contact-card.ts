import { Block } from "../../utils/core/Block";
import "./contact-card.less";
import { template as contCardTemplate } from "./contact-card.template";
import defaultAvaChat from "../../static/img/new-message.png";

type ContactCardProps = {
  avatar?: string;
  urlIm: string;
  id: number;
  idChat: number;
};

export class ContactCard extends Block<ContactCardProps> {
  constructor(props: ContactCardProps) {
    if (props.avatar) {
      props.urlIm =
        "https://ya-praktikum.tech/api/v2/resources/" + props.avatar;
    } else {
      props.urlIm = defaultAvaChat;
    }

    super("div", {
      ...props,
      idChat: props.id,
    });
  }

  render() {
    return this.compile(contCardTemplate, {
      ...this.props,
      idCard: this.props.idChat,
    });
  }
}

import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import Block from '../../utils/Block';
import template from './link.pug';

interface LinkProps extends PropsWithRouter {
  title: string,
  url?: string,
  className?: string | string[],
  events?: {
    click: () => void
  }
}

export class BaseLink extends Block {
  constructor(props: LinkProps) {
    super('div', props);

    if (props.url) {
      this.setProps({
        events: {
          click: () => {
            this.props.router.go(props.url);
          },
        },
      });
    }

    if (this.props.className) {
      const { className } = this.props;
      if (Array.isArray(className)) {
        this.element?.classList.add(...className);
      } else {
        this.element?.classList.add(className);
      }
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Link = withRouter(BaseLink);

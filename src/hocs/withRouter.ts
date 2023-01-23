import { router } from '../router';
import { _TFixTsAny } from '../typings';
import { ComponentConstructable } from '../store/WithStore';

export interface PropsWithRouter {
  router: typeof router;
}

export function withRouter(Component: ComponentConstructable<_TFixTsAny>) {
  type Props = typeof Component extends ComponentConstructable<infer P> ? P : _TFixTsAny;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router });
    }
  };
}

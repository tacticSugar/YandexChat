import Block from '../utils/Block';
import store, { StoreEvents } from '.';
import { StateI, _TFixTsAny } from '../typings';

export interface ComponentConstructable<P extends Record<string, _TFixTsAny>> {
  new(props: P): Block<P>
}

export function withStore<K>(mapStateToProps: (state: StateI) => K) {
  return function wrap<P extends Record<string, _TFixTsAny>>(
    Component: ComponentConstructable<K & P>,
  ) {
    let previousState: K;

    return class WithStore extends Component {
      constructor(props: P) {
        previousState = mapStateToProps(store.getState() as StateI);

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState() as StateI);
          previousState = stateProps;

          this.setProps(({ ...props, ...stateProps }));
        });
      }
    };
  };
}

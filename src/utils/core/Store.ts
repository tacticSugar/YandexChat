import { set } from '../../helpers/mydash/set';
import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Record<string, any> = {};

  constructor() {
    super();
    // console.log("создаём store");
    this.on(StoreEvents.Updated, () => {
      // console.log("изменили store");
    });
  }

  public getState(): Record<string, any> {
    return this.state;
  }

  public setState(path: string, value: unknown) {
    // console.log("setting store", this.getState());
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, {});
  }
}

const store = new Store();
export { store };

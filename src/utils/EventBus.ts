import { _TFixTsAny } from '../typings';

type Callback<C extends _TFixTsAny[] = unknown[]> = (...args: C) => void;
type MapI<P> = P[keyof P];

class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapI<E>, _TFixTsAny[]> = Record<string, _TFixTsAny[]>
> {
  private readonly listeners: {
    [K in MapI<E>]?: Callback<Args[K]>[]
  } = {};

  on<Event extends MapI<E>>(event: Event, callback: Callback<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off<Event extends MapI<E>>(event: Event, callback: Callback<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback,
    );
  }

  emit<Event extends MapI<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]?.forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;

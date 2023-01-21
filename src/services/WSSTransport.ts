import EventBus from '../utils/EventBus';
import logger from '../utils/logger';

class WSSTransport extends EventBus {
  private instance: WebSocket | null = null;

  private pingIntervalId: NodeJS.Timer | null = null;

  constructor(user_id: number, chat_id: number, token_value: string) {
    super();
    const url = `wss://ya-praktikum.tech/ws/chats/${user_id}/${chat_id}/${token_value}`;
    const soket = new WebSocket(url);

    soket.onmessage = this.onmessage.bind(this);
    soket.onerror = this.error.bind(this);
    soket.onclose = this.close.bind(this);
    soket.onopen = this.onopen.bind(this);

    this.instance = soket;
  }

  public onopen() {
    this.emit('open');
    this.setupPing(6000);
    logger.log('open');
  }

  public close(e: CloseEvent | string) {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
    }
    logger.log(e);
  }

  public error(e: Event) {
    logger.log(e);
  }

  public onmessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (Array.isArray(data) && data.length > 0) {
      this.emit('addMessage', data);
    } else if (typeof data === 'object' && !Array.isArray(data) && data.type === 'message') {
      this.emit('addMessage', data);
    }
  }

  public send(data: string) {
    this.instance?.send(data);
  }

  public getStatus() {
    return this.instance?.readyState;
  }

  private setupPing(interval: number) {
    this.pingIntervalId = setInterval(() => {
      this.send(JSON.stringify({ type: 'ping' }));
    }, interval);
  }
}

export default WSSTransport;

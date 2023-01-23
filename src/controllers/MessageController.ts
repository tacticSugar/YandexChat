import ChatsApi from '../api/ChatsApi';
import WSSTransport from '../services/WSSTransport';
import store from '../store';
import { MessageI, StateI, _TFixTsAny } from '../typings';
import logger from '../utils/logger';

export class MessageController {
  private managerSockets: Record<number, WSSTransport> = {};

  async connect(user_id: number, chat_id: number) {
    try {
      if (this.managerSockets[chat_id]) {
        const status = this.managerSockets[chat_id].getStatus();
        if (status !== 3) {
          return;
        }
      }

      const { token } = await ChatsApi.getToken(chat_id);

      const item = new Promise((resolve) => {
        const socket = new WSSTransport(user_id, chat_id, token);

        this.managerSockets[chat_id] = socket;
        socket.on('addMessage', this.addMessage.bind(this));
        socket.on('open', resolve);
      });
      await item;

      this.sendMessage({ type: 'get old', content: '0' }, chat_id);
      store.set(`pages.${chat_id}`, { pageNumber: 0, isThisLast: false });
    } catch (e) {
      logger.error(e);
    }
  }

  addMessage(data: MessageI[] | MessageI) {
    const { currentChatId, messages } = store.getState() as StateI;

    if (Array.isArray(data) && currentChatId) {
      if (messages && messages[currentChatId]) {
        const dataWithMessages = [...messages[currentChatId], ...data];
        store.set(`messages.${currentChatId}`, dataWithMessages);
      } else {
        store.set(`messages.${currentChatId}`, data);
      }

      if (data.length < 20) {
        store.set(`pages.${currentChatId}.isThisLast`, true);
      }
    } else if (currentChatId) {
      const newData = [data, ...messages[currentChatId]];
      store.set(`messages.${currentChatId}`, newData);
    }
  }

  sendMessage(data: Record<string, _TFixTsAny>, chat_id: number) {
    const socket = this.managerSockets[chat_id];

    if (socket) {
      const status = socket.getStatus();
      if (status === 1) {
        socket.send(JSON.stringify(data));
      } else if (status === 3) {
        const state = store.getState() as StateI;
        const { id } = state.user;
        this.connect(id, chat_id);
        socket.send(JSON.stringify(data));
      }
    }
  }

  getOldMessage(id: number) {
    const { pages } = store.getState() as StateI;
    const { pageNumber, isThisLast } = pages[id];

    if (!isThisLast) {
      const nextPage = pageNumber + 1;
      this.sendMessage({ type: 'get old', content: nextPage * 20 }, id);
      store.set(`pages.${id}.pageNumber`, nextPage);
    }
  }

  deleteSocket(id: number) {
    this.managerSockets[id].close('Вы вышли');
    delete this.managerSockets[id];
  }
}

export default new MessageController();

import BaseApi from '../BaseApi';
import {
  AddUsersToChat, DeleteUsersFromChat, ReadChatsData, ReadChatUsers,
} from './ChatsApiTypes';

export class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  // Получаем все чаты

  getChats(data?: ReadChatsData) {
    return this.http.get('', { data });
  }

  // Создаем чат

  createChat(data: string): Promise<Record<'id', string>> {
    return this.http.post('', { data: { title: data } });
  }

  // Удаляем чат

  deleteChatById(chatId: number) {
    return this.http.delete('', {
      data: {
        chatId,
      },
    });
  }

  // Узнаем кол-во непрочитанных сообщений

  getNewMessagesCount(id: number) {
    return this.http.get(`/new/${id}`);
  }

  // Получаем пользователей чата по id чата

  getChatUsers(id: number, data: ReadChatUsers) {
    return this.http.get(`/${id}/users`, { data });
  }

  // Добавляем пользователей в чат по его id

  addUsersToChat(data: AddUsersToChat) {
    return this.http.put('/users', { data });
  }

  // Удаляем пользователей из чата по его id

  deleteUsersFromChat(data: DeleteUsersFromChat) {
    return this.http.delete('/users', { data });
  }

  // Обновляем аватар чата

  updateChatAvatar(id: number, data: FormData) {
    return this.http.put('/avatar', {
      data: {
        chatId: id,
        avatar: data,
      },
    });
  }

  // Получаем токен для подключения к real-time чату по id чата

  getToken(id: number): Promise<Record<'token', string>> {
    return this.http.post(`/token/${id}`);
  }

  read = undefined;

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new ChatsApi();

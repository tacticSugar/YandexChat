export interface ReadChatsData {
  offset: number,
  limit: number,
  title: string,
}

export interface ReadChatUsers {
  offset?: number,
  limit?: number,
  name?: string,
  email?: string,
}

export interface AddUsersToChat {
  users: number[],
  chatId: number,
}

export interface DeleteUsersFromChat{
  users: number[],
  chatId: number,
}

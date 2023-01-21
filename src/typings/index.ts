// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type _TFixTsAny = any;

export type EventElement = { target: HTMLElement }

export interface UserI {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string | null;
}

export interface ChatI {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  created_by: number,
  last_message: {
    user: Omit<UserI, 'id' | 'password' | 'display_name'>,
    time: string,
    content: string,
  } | null,
}

export interface MessageI {
  id: number,
  user_id: number,
  chat_id: number,
  time: string,
  content: string,
  is_read: boolean,
  file: null,
  type: string
}

export interface PagesCount {
  pageNumber: number,
  isThisLast: boolean,
}

export interface StateI {
  user: UserI,
  chats: ChatI[],
  currentChatId: number | null,
  messages: Record<string, MessageI[]>,
  pages: Record<string, PagesCount>,
}

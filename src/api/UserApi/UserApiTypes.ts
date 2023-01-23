export interface PasswordUpdateData {
  oldPassword: string,
  newPassword: string,
}

export interface UserUpdateData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface SearchUserData {
  login: string
}

export type AvatarUpdateData = FormData;

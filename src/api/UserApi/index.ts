import { UserI } from '../../typings';
import BaseApi from '../BaseApi';
import {
  AvatarUpdateData, PasswordUpdateData, SearchUserData, UserUpdateData,
} from './UserApiTypes';

export class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  updateUser(data: UserUpdateData) {
    return this.http.put('/profile', { data });
  }

  updatePassword(data: PasswordUpdateData) {
    return this.http.put('/password', { data });
  }

  updateAvatar(data: AvatarUpdateData) {
    return this.http.put('/profile/avatar', { data });
  }

  readUserById(id: string) {
    return this.http.get(`/${id}`);
  }

  searchUser(data: SearchUserData): Promise<Array<Omit<UserI, 'password'>>> {
    return this.http.post('/search', { data });
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new UserApi();

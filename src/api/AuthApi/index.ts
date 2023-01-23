import { UserI } from '../../typings';
import BaseApi from '../BaseApi';
import { SignInData, SignUpData } from './AuthTypes';

export class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  signIn(data: SignInData) {
    return this.http.post('/signin', { data });
  }

  signUp(data: SignUpData) {
    return this.http.post('/signup', { data });
  }

  readUser(): Promise<UserI> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthApi();

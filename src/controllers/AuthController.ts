import { Routes } from '..';
import API, { AuthApi } from '../api/AuthApi';
import { SignInData, SignUpData } from '../api/AuthApi/AuthTypes';
import ResourcesApi from '../api/ResourcesApi';
import { Chat } from '../pages/chat';
import { Profile } from '../pages/profile';
import { ChangeProfile } from '../pages/profile/change';
import { PasswordProfile } from '../pages/profile/password';
import { router } from '../router';
import store from '../store';
import Block from '../utils/Block';
import logger from '../utils/logger';
import ChatsController from './ChatsController';

export class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = API;
  }

  async fetchUser() {
    try {
      const user = await this.api.readUser();
      store.set('user', user);
      if (!user.display_name) {
        store.set('user.display_name', user.first_name);
      }
      if (user.avatar) {
        store.set('user.avatar', ResourcesApi.getUrlImg(user.avatar));
      }
    } catch (e) {
      logger.error(e);
      throw new Error(e as string);
    }
  }

  async signIn(data: SignInData) {
    try {
      await this.api.signIn(data);
      await this.fetchUser();
      await ChatsController.fetchChats();
      router
        .use(Routes.Messenger, Chat)
        .use(Routes.Settings, Profile as unknown as typeof Block)
        .use(Routes.SettingsChange, ChangeProfile)
        .use(Routes.SettingsPassword, PasswordProfile)
        .go(Routes.Messenger);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }

  async signUp(data: SignUpData) {
    try {
      await this.api.signUp(data);
      await ChatsController.fetchChats();
      await this.fetchUser();
      router
        .use(Routes.Messenger, Chat)
        .use(Routes.Settings, Profile as unknown as typeof Block)
        .use(Routes.SettingsChange, ChangeProfile)
        .use(Routes.SettingsPassword, PasswordProfile)
        .go(Routes.Messenger);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      router.go(Routes.Index);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }
}

export default new AuthController();

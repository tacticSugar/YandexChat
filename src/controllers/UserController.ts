import { Routes } from '..';
import API, { UserApi } from '../api/UserApi';
import {
  AvatarUpdateData, PasswordUpdateData, SearchUserData, UserUpdateData,
} from '../api/UserApi/UserApiTypes';
import { router } from '../router';
import logger from '../utils/logger';
import AuthController from './AuthController';

export class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = API;
  }

  async updateProfile(data: UserUpdateData) {
    try {
      await this.api.updateUser(data);
      await AuthController.fetchUser();
      router.go(Routes.Settings);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }

  async updatePassword(data: PasswordUpdateData) {
    try {
      await this.api.updatePassword(data);
      router.go(Routes.Settings);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }

  async updateAvatar(data: AvatarUpdateData) {
    try {
      await this.api.updateAvatar(data);
      await AuthController.fetchUser();
    } catch (e) {
      logger.error((e as Error).message);
    }
  }

  async getUserById(id: string) {
    try {
      await this.api.readUserById(id);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }

  async searchUsers(data: SearchUserData) {
    try {
      await this.api.searchUser(data);
    } catch (e) {
      logger.error((e as Error).message);
    }
  }
}

export default new UserController();

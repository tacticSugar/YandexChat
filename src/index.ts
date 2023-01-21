/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Chat } from './pages/chat';
import { Profile } from './pages/profile';
import { ChangeProfile } from './pages/profile/change';
import { PasswordProfile } from './pages/profile/password';
import { SignIn } from './pages/signIn';
import { SignUp } from './pages/signUp';
import { Error404 } from './pages/error404';
import { Error500 } from './pages/error500';
import { router } from './router';
import AuthController from './controllers/AuthController';
import ChatsController from './controllers/ChatsController';
import Block from './utils/Block';
import './index.scss';

export enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Messenger = '/messenger',
  Settings = '/settings',
  SettingsChange = '/settings/change',
  SettingsPassword = '/settings/password',
  Error4 = '/error404',
  Error5 = '/error500'
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, SignIn)
    .use(Routes.Signup, SignUp)
    .use(Routes.Error4, Error404)
    .use(Routes.Error5, Error500);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Signup:
      isProtectedRoute = false;
      break;
    default:
      break;
  }

  try {
    await AuthController.fetchUser();
    await ChatsController.fetchChats();
    router
      .use(Routes.Messenger, Chat)
      .use(Routes.Settings, Profile as unknown as typeof Block)
      .use(Routes.SettingsChange, ChangeProfile)
      .use(Routes.SettingsPassword, PasswordProfile)
      .start();

    if (!isProtectedRoute) {
      router.go(Routes.Messenger);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});

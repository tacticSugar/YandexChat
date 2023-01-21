import { Routes } from '..';
import Block from '../utils/Block';
import { Route } from './Route';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  private currentRoute: Route | null = null;

  private parameter: number | string | null = null;

  private rootQuery!: string;

  routes: Route[] = [];

  history = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/error404');
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  public go(pathname: string, parameter?: number | null) {
    if (parameter) {
      this.history.pushState({}, '', `${pathname}/${parameter}`);
      this.parameter = parameter;
    } else if (parameter === null) {
      this.parameter = null;
      this.history.pushState({}, '', pathname);
    } else {
      this.history.pushState({}, '', pathname);
    }
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: string) {
    const messengerRegExp = /^\/messenger\/\d+$/i; // MEMORY: в будущих версиях доработаем и сделаем красиво

    if (messengerRegExp.test(pathname)) {
      const pathnameSplits = pathname.split('/');
      const parameter = pathnameSplits[pathnameSplits.length - 1];
      this.parameter = parameter;
      return this.routes.find((route) => route.match(Routes.Messenger));
    }
    return this.routes.find((route) => route.match(pathname));
  }

  public getParameter() {
    return this.parameter;
  }
}

export const router = new Router('#app');

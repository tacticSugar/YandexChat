import Block from '../utils/Block';
import { isEqualString } from '../utils/helpers';
import { render } from '../utils/render';

export class Route {
  private pathname: string;

  private readonly _blockClass: typeof Block;

  private block: Block | null;

  private readonly _props: string;

  constructor(pathname: string, view: typeof Block, props: string) {
    this.pathname = pathname;
    this._blockClass = view;
    this.block = null;
    this._props = props;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqualString(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this._blockClass();
      render(this._props, this.block);
    }
  }
}

import { expect } from 'chai';
import { SignIn } from '../pages/signIn';
import { Route } from './Route';

describe('Route', () => {
  const route = new Route('/', SignIn, '#app');

  it('Instance create', () => {
    expect(route).to.be.an.instanceof(Route);
  });

  it('match method should compare paths', () => {
    expect(route.match('/')).to.be.true;
    expect(route.match('/login')).to.be.false;
  });

  it('render method should render HTMLElement', () => {
    const element = document.getElementById('app');

    route.render();

    expect(element?.childElementCount).to.equal(1);
    expect(element?.children.item(0)).to.be.an.instanceOf(window.HTMLElement);
  });
});

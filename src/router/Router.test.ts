import { expect } from 'chai';
import Router, { router } from '.';
import { BlockMock, getContentFake } from '../assets';
import { Route } from './Route';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  it('method use should return Router instance', () => {
    expect(router).to.be.an.instanceof(Router);
  });

  it('method getRoute() must be return intance of Route', () => {
    // @ts-ignore
    router.use('/', BlockMock);
    const result = router.getRoute('/');
    expect(result).to.be.an.instanceof(Route);
  });

  it('must call the Render method at startup', () => {
    router.start();
    expect(getContentFake.callCount).to.eq(1);
  });

  it('call method back() should render a page on history back action', () => {
    router.back();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('call method forward() should render a page on history forward action', () => {
    router.forward();

    expect(getContentFake.callCount).to.eq(1);
  });
});

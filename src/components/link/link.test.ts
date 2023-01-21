import { expect } from 'chai';
import Sinon from 'sinon';
import { Link } from '.';
import { BlockMock } from '../../assets';
import { router } from '../../router';
import Block from '../../utils/Block';

describe('Link', () => {
  it('should render', () => {
    const result = new Link({ title: 'To go' });

    expect(result).to.be.an.instanceof(Block);
  });

  it('element should return div element', () => {
    const link = new Link({ title: 'To go' });
    const { element } = link;

    expect(element).to.be.an.instanceof(window.HTMLDivElement);
  });

  it('should go to passe route on click', () => {
    // @ts-ignore
    router.use('/test', BlockMock);
    const link = new Link({ title: 'To go', url: '/test' });
    const spy = Sinon.spy(router, 'go');
    const element = link.element as HTMLElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});

import Sinon from 'sinon';
import proxyquire from 'proxyquire';
import { expect } from 'chai';

const eventBusMock = {
  on: Sinon.fake(),
  off: Sinon.fake(),
  emit: Sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    default: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;

      off = eventBusMock.off;
    },
  },
});

describe('Block', () => {
  class ComponentMock extends Block {}

  it('should fire init event on initialization', () => {
    // eslint-disable-next-line no-new
    new ComponentMock();

    expect(eventBusMock.emit.calledWith('init')).to.be.true;
  });

  it('event component-did-mount must be call on method dispatchComponentDidMount ', () => {
    const result = new ComponentMock();
    result.dispatchComponentDidMount();

    expect(eventBusMock.emit.calledWith('flow:component-did-mount')).to.be.true;
  });
});

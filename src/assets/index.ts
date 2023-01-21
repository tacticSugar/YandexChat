// eslint-disable-next-line import/no-extraneous-dependencies
import Sinon from 'sinon';

export const getContentFake = Sinon.fake.returns(document.createElement('div'));

export const BlockMock = class {
  getContent = getContentFake;
};

import sinon from 'sinon';
import * as actions from './editor';

describe('store:actions:editor', () => {
  let getState1;
  let getState2;
  let dispatch;
  const state1 = {
    editor: {
      textViewId: 'test',
    },
    hsc: {
      playingTimebarId: null,
    },
  };
  const state2 = {
    editor: {
      textViewId: 'test',
    },
    hsc: {
      playingTimebarId: 'test',
    },
  };
  beforeEach(() => {
    dispatch = sinon.spy();
    getState1 = () => state1;
    getState2 = () => state2;
  });

  it('DONT dispatch pause action', () => {
    actions.openHtmlEditor('test')(dispatch, getState1);
    dispatch.should.have.been.callCount(1);
  });
  it('dispatch pause action', () => {
    actions.openHtmlEditor('test')(dispatch, getState2);
    dispatch.should.have.been.callCount(2);
  });
});

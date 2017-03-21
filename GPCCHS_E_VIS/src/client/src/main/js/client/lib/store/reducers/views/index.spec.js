/* eslint no-unused-expressions: "off" */
import * as types from '../../types';
import viewsReducer, { getView, getViews } from '.';
import { freezeArgs, getStore, should } from '../../../common/test';

const reducer = freezeArgs(viewsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:views:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ myViewId: { title: 'Title' } }, {})
      .should.eql({ myViewId: { title: 'Title' } });
  });
  it('HSC workspace', () => {
    it('close', () => {
      const newState = reducer({ myView: { id: 'Id' } }, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:views:selectors', () => {
  it('getView', () => {
    const { getState } = getStore({
      views: {
        myViewId: { title: 'Title 1' },
      },
    });
    getView(getState(), { viewId: 'myViewId' }).should.have.property('title', 'Title 1');
    should.not.exist(getView(getState(), { viewId: 'unknownId' }));
  });
  describe('getViews', () => {
    it('should returns views', () => {
      const state = {
        views: {
          myId: { title: 'Title' },
          myOtherId: { title: 'Title other' },
        },
      };
      const { getState } = getStore(state);
      getViews(getState()).should.equal(state.views);
    });
  });
});

/* eslint no-unused-expressions: "off" */
import * as types from '../../types';
import viewsReducer from '.';
import { freezeArgs } from '../../../common/test';

const reducer = freezeArgs(viewsReducer);

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

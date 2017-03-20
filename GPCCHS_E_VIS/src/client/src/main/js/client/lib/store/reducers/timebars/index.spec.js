/* eslint no-unused-expressions: 0 */
import { freezeArgs } from '../../../common/test';
import timebarsReducer from '.';
import * as types from '../../types';

const reducer = freezeArgs(timebarsReducer);

describe('store:timebars:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ tb1: { id: 'tb1' } }, { payload: { timebarUuid: 'tb1' } })
      .should.eql({ tb1: { id: 'tb1' } });
  });
  describe('HSC workspace', () => {
    const state = {
      tb1: {
        id: 'tb1',
        visuWindow: {
          lower: 200,
          upper: 400,
          current: 300,
          defauttWidth: 600,
        },
        slideWindow: { lower: 250, upper: 350 },
      },
    };
    it('close', () => {
      const newState = reducer(state, { type: types.HSC_CLOSE_WORKSPACE });
      newState.should.be.an('object').that.is.empty;
    });
  });
});

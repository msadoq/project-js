/* eslint no-unused-expressions: 0 */
import { should, freezeArgs, getStore } from '../../../common/test';
import * as types from '../../types';
import timebarsReducer, {
  getTimebar,
  getTimebars,
  getFirstTimebarId,
} from '.';

const reducer = freezeArgs(timebarsReducer);

/* --- Reducer -------------------------------------------------------------- */
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

/* --- Selectors ------------------------------------------------------------ */
describe('store:timebars:selectors', () => {
  it('getTimebar', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    getTimebar(getState(), { timebarUuid: 'myTimebarId' }).should.have.property('id', 'Id');
    should.not.exist(getTimebar(getState(), { timebarUuid: 'unknownId' }));
  });
  it('getTimebars', () => {
    const state = {
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    };
    const { getState } = getStore(state);
    getTimebars(getState()).should.be.eql(state.timebars);
  });
  it('getFirstTimebarId', () => {
    const state = {
      timebars: { aaa: {} },
    };
    const { getState } = getStore(state);
    getFirstTimebarId(getState()).should.be.eql('aaa');
  });
});

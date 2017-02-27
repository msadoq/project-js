/* eslint no-unused-expressions: 0 */
import _omit from 'lodash/omit';
import { freezeArgs } from '../../common/test';
import * as actions from '../actions/timebars';
import timebarsReducer from './timebars';
import * as types from '../types';

const reducer = freezeArgs(timebarsReducer);

describe('store:timebars:reducer', () => {
  it('initial state', () => {
    reducer(undefined, {}).should.be.an('object').that.is.empty;
  });
  it('unknown action', () => {
    reducer({ tb1: { id: 'tb1' } }, { payload: { timebarUuid: 'tb1' } })
      .should.eql({ tb1: { id: 'tb1' } });
  });
  describe('_add', () => {
    it('add', () => {
      const fixture = {
        id: 'Id',
        visuWindow: { lower: 10 },
        slideWindow: { lower: 20 },
        rulerResolution: 100,
        speed: 10,
        realTime: false,
        masterId: 'OtherId',
        timelines: ['myTimelineId'],
      };
      const state = reducer(
        undefined,
        actions._add('myTimebarId', fixture)
      );
      state.myTimebarId.should.have.properties(
        _omit(state.myTimebarId, ['extUpperBound', 'rulerStart', 'timelines'])
      );
      state.myTimebarId.should.have.property('extUpperBound');
      state.myTimebarId.should.have.property('rulerStart');
    });
    it('add empty', () => {
      const state = reducer(
        undefined,
        actions._add('myTimebarId')
      );
      state.myTimebarId.should.have.properties({
        id: null,
        rulerResolution: 2250,
        speed: 1,
        mode: 'Normal',
        masterId: null,
      });
      state.myTimebarId.should.have.property('extUpperBound');
      state.myTimebarId.should.have.property('rulerStart');
      state.myTimebarId.should.have.property('visuWindow');
      state.myTimebarId.should.have.property('slideWindow');
      state.myTimebarId.visuWindow.lower.should.be.below(state.myTimebarId.slideWindow.lower);
      state.myTimebarId.slideWindow.lower.should.be.below(state.myTimebarId.visuWindow.current);
      state.myTimebarId.visuWindow.current.should.be.below(state.myTimebarId.slideWindow.upper);
      state.myTimebarId.slideWindow.upper.should.be.below(state.myTimebarId.visuWindow.upper);
    });
  });
  describe('remove', () => {
    it('remove', () => {
      const state = reducer(
        { myTimebarId: { id: 'Id' } },
        actions.remove('myTimebarId')
      );
      state.should.not.have.property('myTimebarId');
    });
    it('remove unknown', () => {
      const state = reducer(
        { myTimebarId: { id: 'Id' } },
        actions.remove('foo')
      );
      state.should.have.property('myTimebarId');
    });
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

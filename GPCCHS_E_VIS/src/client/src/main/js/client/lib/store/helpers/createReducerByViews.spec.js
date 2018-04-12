// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import _ from 'lodash/fp';
import { freezeArgs } from 'common/jest';
import * as types from '../types';
import createReducerByViews from './createReducerByViews';

describe('store:createReducerByViews', () => {
  const testStateA = { a: 1, b: 2, c: 3, d: { type: 'PlotView' } };
  const viewReducer = _.always('__VIEW__');
  const reducer = freezeArgs(createReducerByViews(viewReducer));
  const testTimebarUuidA = { timebarUuid: '372eb65f-2993-4eca-a7b1-3240c8f9241f' };
  const testPageA = {
    pages: { '50d182ac-241c-4d17-8fa8-d7b96d7b463a':
    { absolutePath: '/dummyPath/maximized.page.vipg',
      isModified: false,
      layout: [[Object], [Object]],
      panels: { editorIsMinimized: true,
        editorWidth: 400,
        explorerIsMinimized: true,
        explorerWidth: 250,
        searchCount: null,
        searchIsMinimized: true,
        searchViewId: null,
        searchWidth: 300,
        timebarHeight: 130,
        timebarIsMinimized: false },
      properties: [],
      timebarUuid: '372eb65f-2993-4eca-a7b1-3240c8f9241f',
      title: 'Maximized view page',
      type: 'Page',
      uuid: '50d182ac-241c-4d17-8fa8-d7b96d7b463a',
      views: ['816c83ca-a7b8-4c89-b1a6-9b7807402e26',
        'd2dbcbe4-4c8d-452d-a30e-d3aec7cdf48a',
        'd'] },
    },
  };
  const testVisuWindowA = {
    visuWindow: { current: 1528443484548,
      lower: 1528442831173.6013,
      saved: false,
      upper: 1528443514548 },
  };
  const testVisuWindowB = {
    visuWindow: { current: 1528443484548,
      lower: 1528442831173.6013,
      saved: false,
      upper: 1528443014548 },
  };
  describe('with all view types', () => {
    test('should reset state when close workspace', () => {
      expect(reducer(testStateA, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
    });
    test('should remove related views when close a page', () => {
      expect(
        reducer(testStateA, { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['a', 'b'] } })
      ).toEqual({ c: 3, d: { type: 'PlotView' } });
    });
    test('should create a new view', () => {
      const createAction = type => ({ type, payload: { view: { uuid: 'abcd' } } });
      expect(reducer(testStateA, createAction(types.WS_VIEW_OPENED))).toEqual({ ...testStateA, abcd: '__VIEW__' });
      expect(reducer(testStateA, createAction(types.WS_VIEW_ADD_BLANK))).toEqual({ ...testStateA, abcd: '__VIEW__' });
    });
    test('should remove related views when close a window', () => {
      expect(
        reducer(testStateA, { type: types.WS_WINDOW_CLOSE, payload: { views: ['a', 'b'] } })
      ).toEqual({ c: 3, d: { type: 'PlotView' } });
    });
    test('should remove closed view', () => {
      expect(
        reducer(testStateA, { type: types.WS_VIEW_CLOSE, payload: { viewId: 'a' } })
      ).toEqual({ b: 2, c: 3, d: { type: 'PlotView' } });
    });
    test('add several views', () => {
      const createAction = type => ({ type, payload: { views: [{ uuid: 'd' }, { uuid: 'e' }] } });
      expect(reducer({}, createAction(types.WS_PAGE_OPENED))).toEqual({ d: '__VIEW__', e: '__VIEW__' });
      expect(reducer({}, createAction(types.WS_WORKSPACE_OPENED))).toEqual({ d: '__VIEW__', e: '__VIEW__' });
    });
    test('should call given reducer when have a viewId in payload', () => {
      const newState = reducer(testStateA, { type: 'DUMMY_ACTION', payload: { viewId: 'a' } });
      expect(newState).toEqual({ a: '__VIEW__', b: 2, c: 3, d: { type: 'PlotView' } });
    });
    test('sampling state needs to be initialized to on on when timeBar interval is larger than limit', () => {
      const testPayload = {
        ...testTimebarUuidA,
        ...testPageA,
        ...testVisuWindowA,
      };
      const newState = reducer(testStateA, { type: 'WS_TIMEBAR_UPDATE_CURSORS', payload: { ...testPayload } });
      expect(newState.d.sampling.samplingLock).toEqual('on');
      expect(newState.d.sampling.samplingStatus).toEqual('on');
    });
    test('sampling state needs to switch to on on when timeBar interval gets larger than limit', () => {
      const testPayload = {
        ...testTimebarUuidA,
        ...testPageA,
        ...testVisuWindowA,
      };
      const testStateB = {
        ...testStateA,
        d: {
          type: 'PlotView',
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'off',
          },
        },
      };
      const newState = reducer(testStateB, { type: 'WS_TIMEBAR_UPDATE_CURSORS', payload: { ...testPayload } });
      expect(newState.d.sampling.samplingLock).toEqual('on');
      expect(newState.d.sampling.samplingStatus).toEqual('on');
    });
    test('sampling state needs to remain off off when timeBar interval is less limit', () => {
      const testPayload = {
        ...testTimebarUuidA,
        ...testPageA,
        ...testVisuWindowB,
      };
      const testStateB = {
        ...testStateA,
        d: {
          type: 'PlotView',
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'off',
          },
        },
      };
      const newState = reducer(testStateB, { type: 'WS_TIMEBAR_UPDATE_CURSORS', payload: { ...testPayload } });
      expect(newState.d.sampling.samplingLock).toEqual('off');
      expect(newState.d.sampling.samplingStatus).toEqual('off');
    });
    test('sampling state needs to remain off on when timeBar interval is less limit', () => {
      const testPayload = {
        ...testTimebarUuidA,
        ...testPageA,
        ...testVisuWindowB,
      };
      const testStateB = {
        ...testStateA,
        d: {
          type: 'PlotView',
          sampling: {
            samplingLock: 'off',
            samplingStatus: 'on',
          },
        },
      };
      const newState = reducer(testStateB, { type: 'WS_TIMEBAR_UPDATE_CURSORS', payload: { ...testPayload } });
      expect(newState.d.sampling.samplingLock).toEqual('off');
      expect(newState.d.sampling.samplingStatus).toEqual('on');
    });
  });
});

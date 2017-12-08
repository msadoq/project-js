import { freezeArgs } from 'common/jest';
import * as types from 'store/types';
import * as constants from 'viewManager/constants';
import dataReducer, { getData } from './dataReducer';

import injectDataRangeAction from '../../GroundAlarmView/store/mocks/injectDataRangeAction.json';
import cleanViewDataAction from '../../GroundAlarmView/store/mocks/cleanViewDataAction.json';

const OBA = constants.VM_VIEW_ONBOARDALARM;
const PLOT = constants.VM_VIEW_PLOT;

const reducer = freezeArgs(dataReducer);

describe('OnboardAlarmView:dataReducer', () => {
  describe('reducer', () => {
    test('unknown action does nothing', () => {
      expect(reducer({}, { type: 'DUMMY_ACTION' })).toEqual({});
    });
    describe('documents', () => {
      test('add a view, open a view or reload a view should set initial sub state for the view', () => {
        const initialSubState = { v1: { indexes: [], lines: {} } };
        const state = { v1: { data: true } };

        expect(
          reducer(state, { type: types.WS_VIEW_RELOAD, payload: { view: { type: PLOT, uuid: 'v1' } } })
        ).toBe(state);
        expect(
          reducer(state, { type: types.WS_VIEW_RELOAD, payload: { view: { type: OBA, uuid: 'v1' } } })
        ).toEqual(initialSubState);
        expect(
          reducer(state, { type: types.WS_VIEW_ADD_BLANK, payload: { view: { type: OBA, uuid: 'v1' } } })
        ).toEqual(initialSubState);
        expect(
          reducer(state, { type: types.WS_VIEW_OPENED, payload: { view: { type: OBA, uuid: 'v1' } } })
        ).toEqual(initialSubState);
      });
      test('open a page or a workspace should set initial sub state for each related views', () => {
        const state = { v1: { data: true } };
        const payload = {
          views: [
            { type: PLOT, uuid: 'v0' },
            { type: OBA, uuid: 'v1' },
            { type: OBA, uuid: 'v2' },
            { type: OBA, uuid: 'v3' },
          ],
        };
        const finalState = {
          v1: { lines: {}, indexes: [] },
          v2: { lines: {}, indexes: [] },
          v3: { lines: {}, indexes: [] },
        };
        expect(reducer(state, { type: types.WS_PAGE_OPENED, payload })).toEqual(finalState);
        expect(reducer(state, { type: types.WS_WORKSPACE_OPENED, payload })).toEqual(finalState);
      });
      test('clean state', () => {
        expect(reducer({ a: true }, { type: types.DATA_REMOVE_ALL_VIEWDATA })).toEqual({});
      });
      test('clean state on closing workspace', () => {
        expect(reducer({ a: true }, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
      });
      test('clean sub state when close a view', () => {
        const state = { v1: { data: true }, v2: { data: true } };
        const payload = { viewId: 'v1' };
        expect(
          reducer(state, { type: types.WS_VIEW_CLOSE, payload })
        ).toEqual({ v2: { data: true } });
      });
      test('clean all related views sub state when close a page', () => {
        const state = { v1: { data: true }, v2: { data: true }, v3: { data: true } };
        const payload = { viewIds: ['v1', 'v3', 'unknown_view_id'] };
        expect(
          reducer(state, { type: types.WS_PAGE_CLOSE, payload })
        ).toEqual({ v2: { data: true } });
      });
    });

    describe('data consumption', () => {
      const initialState = {
        v1: { lines: {}, indexes: [] },
        v2: { lines: {}, indexes: [] },
        v3: { lines: {}, indexes: [] },
      };
      const state = reducer(initialState, injectDataRangeAction);
      test('inject onboardAlarm data', () => {
        expect(state).toMatchSnapshot();
      });
      test('clean view data', () => {
        expect(reducer(state, cleanViewDataAction)).toEqual({
          v1: { lines: {}, indexes: [] },
          v2: { lines: {}, indexes: [] },
          v3: { lines: {}, indexes: [] },
        });
      });
    });
  });
  describe('selectors', () => {
    describe('getData', () => {
      const state = {
        OnboardAlarmViewData: {
          v3: {
            stuff: true,
          },
        },
      };
      test('get view data', () => {
        expect(getData(state, { viewId: 'v3' })).toEqual({ stuff: true });
      });
      test('get undefined when view is unknown', () => {
        expect(getData(state, { viewId: 'unknown_view' })).toBe(undefined);
      });
    });
  });
});

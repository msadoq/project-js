// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

import _omit from 'lodash/omit';
import * as types from 'store/types';
import * as constants from 'viewManager/constants';

// @todo remove stub data
const initialState = {
  subSchedules: [
    { ssid: 87, ssidLabel: 'xxx', name: 'xxx', status: 'disabled', firstTCTime: 1527520025823, updateType: 'TM', updateTime: 1527520025823, nbTc: 1 },
    { ssid: 90, ssidLabel: 'xxx', name: 'xxx', status: 'disabled', firstTCTime: 1527520025823, updateType: 'TM', updateTime: 1527520025823, nbTc: 1 },
    { ssid: 247, ssidLabel: 'xxx', name: 'xxx', status: 'disabled', firstTCTime: 1527520025823, updateType: 'TM', updateTime: 1527520025823, nbTc: 1 },
    { ssid: 642, ssidLabel: 'xxx', name: 'xxx', status: 'disabled', firstTCTime: 1527520025823, updateType: 'TM', updateTime: 1527520025823, nbTc: 1 },
  ],
  enabledApids: [
    { apid: 9, name: 'OBCENGINE2', updateType: 'TM', updateTime: 1527520025823 },
    { apid: 11, name: 'APID11', updateType: 'TM', updateTime: 1527520025823 },
  ],
  commands: [
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      totShiftTime: 0,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
    {
      apid: 9,
      ssid: 87,
      cmdName: 'xxx',
      cmdShortDescription: 'xxx',
      cmdApName: 'xxx',
      seqCount: 28,
      sourceId: 'xxx',
      cmdStatus: 'ENABLED',
      groundStatus: 'DISABLED',
      initExecTime: 1527520025823,
      curExecTime: 1527520025823,
      updateType: 'TM',
      updateTime: 1527520025823,
    },
  ],
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function historyViewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK:
      if (action.payload.view.type !== constants.VM_VIEW_PUS11) {
        return state;
      }
      return { ...state, [action.payload.view.uuid]: initialState };
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED: {
      const { views } = action.payload;
      if (!views) {
        return state;
      }
      const newState = {};
      views.forEach((view) => {
        if (view.type !== constants.VM_VIEW_PUS11) {
          return;
        }
        newState[view.uuid] = initialState;
      });
      return { ...state, ...newState };
    }
    case types.WS_VIEW_CLOSE: {
      const { viewId } = action.payload;
      if (state[viewId]) {
        return _omit(state, viewId);
      }
      return state;
    }
    case types.WS_PAGE_CLOSE: {
      const { viewIds } = action.payload;
      if (!viewIds.length) {
        return state;
      }
      let newState = state;
      viewIds.forEach((viewId) => {
        if (state[viewId]) {
          newState = _omit(newState, viewId);
        }
      });
      return newState;
    }
    default:
      return state;
  }
}

export const getPUS11ViewData = state => state[`${constants.VM_VIEW_PUS11}Data`];
export const getData = (state, { viewId }) => state[`${constants.VM_VIEW_PUS11}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${constants.VM_VIEW_PUS11}Configuration`][viewId];

import _get from 'lodash/get';
import _ from 'lodash/fp';
import * as types from '../../types';
/* --- Reducer -------------------------------------------------------------- */

export default function uiReducer(state = {}, action) {
  switch (action.type) {
    case types.WS_EDITOR_UI_PANEL: {
      const panels = action.payload.panels.reduce(
        (result, key) => {
          // eslint-disable-next-line
          result[key] = _get(state, ['editor', action.payload.viewId, action.payload.section, key], true);
          return result;
        },
        {}
      );
      return _.set(
        ['editor', action.payload.viewId, action.payload.section],
        panels,
        state
      );
    }
    case types.WS_EDITOR_UI_SUBPANEL: {
      return _.set(
        ['editor', action.payload.viewId, action.payload.section, action.payload.panel],
        action.payload.subPanels,
        state
      );
    }
    case types.WS_EDITOR_UI_TAB: {
      return _.set(
        ['editor', action.payload.viewId, 'tab'],
        action.payload.tab,
        state
      );
    }
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getViewTab = (state, { viewId }) => _get(state, ['ui', 'editor', viewId, 'tab'], null);

export const getViewPanels = (state, { viewId }) => _get(state, ['ui', 'editor', viewId, 'panels'], {});
export const getViewSubPanels = (state, { viewId, panel }) => _get(state, ['ui', 'editor', viewId, 'panels', panel], []);

export const getViewEntryPointsPanels = (state, { viewId }) =>
  _get(state, ['ui', 'editor', viewId, 'entryPoints'], {});

export const getViewEntryPointsSubPanels = (state, { viewId, entryPoint }) =>
  _get(state, ['ui', 'editor', viewId, 'entryPoints', entryPoint.id], []);

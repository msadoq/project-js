import _ from 'lodash/fp';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';

import { getFocusedWindowId } from '../reducers/hsc';
import { getPages } from '../reducers/pages';
import {
  getWindows,
  getWindowPageIds,
  getWindowFocusedPageId,
} from '../reducers/windows';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

// composed
export const getFocusedWindow = createSelector(
  getWindows,
  getFocusedWindowId,
  _get
);

// composed
export const getWindowPages = createSelector(
  getWindowPageIds,
  getPages,
  (ids = [], pages) => ids.map(id => ({ ...pages[id], pageId: id }))
);

// composed
export const getWindowFocusedPageSelector = createSelector(
  getWindowFocusedPageId,
  getPages,
  _.get
);

// specific to windowsManager/windows
export const getWindowsTitle = createSelector(
  getWindows,
  windows => _reduce(
    windows,
    (titles, window, windowId) => Object.assign(titles, {
      [windowId]: `${window.title}${(window.isModified === true) ? ' *' : ''} - VIMA`,
    }), {})
);

// specific to menuManaer/workspaceSave
export function getModifiedWindowsIds(state) {
  return _filter(Object.keys(getWindows(state)), wId => state.windows[wId].isModified);
}

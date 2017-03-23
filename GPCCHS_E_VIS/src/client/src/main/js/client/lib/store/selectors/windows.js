import _ from 'lodash/fp';
import _get from 'lodash/get';
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

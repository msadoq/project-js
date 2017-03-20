import { createSelector } from 'reselect';
import _reduce from 'lodash/reduce';
import __ from 'lodash/fp';

// simple
export const getViewData = state => state.viewData;

// simple
export const getData = createSelector(
  (state, { viewId }) => viewId,
  getViewData,
  __.get
);

// simple, but need specific selectors for each viewType
// TODO test + reselect
export const getCount = state => _reduce(getViewData(state), (c, view) => {
  if (typeof view.columns === 'object') {
    // PlotView
    return _reduce(view.columns, (c2, column) => c2 + (Object.keys(column).length - 1), c);
  } else if (typeof view.values === 'object') {
    // TextView / DynamicView
    return c + Object.keys(view.values).length;
  }
  // other view type
  return c + 1;
}, 0);

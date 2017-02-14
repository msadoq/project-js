import 'reselect';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';

export const getViewData = state => state.viewData;

export const getData = (state, viewId) => _get(state, ['viewData', viewId]);

// TODO test + factorize in structure type + reselect
export const getCount = state => _reduce(getViewData(state), (c, view) => {
  if (typeof view.columns === 'object') {
    // PlotView
    return _reduce(view.columns, (c2, column) => c2 + (Object.keys(column).length - 1), c);
  } else if (typeof view.values === 'object') {
    // TextView
    return c + Object.keys(view.values).length;
  }
  // other view type
  return c + 1;
}, 0);

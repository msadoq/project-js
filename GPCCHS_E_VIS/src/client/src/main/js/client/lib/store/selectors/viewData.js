import _reduce from 'lodash/reduce';
import { getViewData } from '../reducers/viewData';

// simple, but need specific selectors for each viewType
// TODO test + reselect
// TODO boxmodel (dbrugne)
const getCount = state => _reduce(getViewData(state), (c, view) => {
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

export default {
  getCount,
};

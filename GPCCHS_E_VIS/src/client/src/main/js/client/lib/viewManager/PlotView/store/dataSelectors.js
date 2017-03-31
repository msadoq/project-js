import { createSelector } from 'reselect';
import { getPlotViewData } from './dataReducer';

const getCount = createSelector(
  getPlotViewData,
  (dataState) => {
    if (!dataState || !Object.keys(dataState).length) {
      return { all: 0 };
    }
    const viewIds = Object.keys(dataState || {});
    const count = {};
    let countAll = 0;
    // Loop on views
    for (let i = 0; i < viewIds.length; i += 1) {
      const viewId = viewIds[i];
      const viewState = dataState[viewId];
      const epNames = Object.keys(viewState.lines || {});
      let ptNb = 0;
      for (let j = 0; j < epNames.length; j += 1) {
        // Each line is an array
        ptNb += viewState.lines[epNames[j]].length;
      }
      count[viewId] = ptNb;
      countAll += ptNb;
    }
    // Add all
    count.all = countAll;
    return count;
  }
);

export default {
  getCount,
};

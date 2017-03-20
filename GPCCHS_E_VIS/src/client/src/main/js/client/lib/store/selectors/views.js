import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import __ from 'lodash/fp';
import _omit from 'lodash/omit';
import _isEqual from 'lodash/isEqual';
import makeGetPerViewData from '../../dataManager/perViewData';
import { getPageIdByViewId } from './pages';
import { getPage } from '../reducers/pages';
// import { getPerViewData } from '../../dataManager/map';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  __.isEqual
);

// simple
export const getViews =
  __.prop('views');

// simple
export const getView =
  (state, { viewId }) =>
    __.prop(viewId, getViews(state));

// simple
export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

// simple
export const getViewConfiguration = createSelector(
  getView,
  __.prop('configuration')
);

// simple
export const getViewContent = createSelector(
  getViewConfiguration,
  __.prop('content')
);
/* ********************************************************
* Comparison function to omit timebars in comparison
* Useful to compute perView and perRemoteId which are independent of visuWinow
// ********************************************************/
function withoutTimebarsEqualityCheck(current, previous) {
  return _isEqual(_omit(current, 'timebars'), _omit(previous, 'timebars'));
}
export const createDeepEqualSelectorWithoutTimebars = createSelectorCreator(
  defaultMemoize,
  withoutTimebarsEqualityCheck
);
const perViewDataSelectors = {};
// composed
export const getPerViewData = createDeepEqualSelectorWithoutTimebars(
  state => state,
  (state, { viewId }) => viewId,
  (state, viewId) => {
    if (!perViewDataSelectors[viewId]) {
      perViewDataSelectors[viewId] = makeGetPerViewData();
    }
    const pageId = getPageIdByViewId(state, { viewId });
    const page = getPage(state, { pageId });
    const { timebarUuid } = page;
    return perViewDataSelectors[viewId](state, { viewId, timebarUuid });
  });

// composed / to rename ?
export const getViewEntryPoints = (state, { viewId }) => (
  __.get('entryPoints', getPerViewData(state, { viewId }))
);

// composed
export const getViewEntryPointsName = createSelector(getViewEntryPoints, entryPoints =>
  __.map(ep => ep.name, entryPoints)
);

// composed
export const getViewEntryPoint = (state, { viewId, epName }) =>
  Object.assign({}, getViewEntryPoints(state, { viewId })[epName], { name: epName });

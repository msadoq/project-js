// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5317 : 09/02/2017 : refactor lodash/fp import because of babel plugin
// VERSION : 1.1.2 : FA : #5316 : 09/02/2017 : Remove all eslint-disable in views reducer
// VERSION : 1.1.2 : DM : #3622 : 10/02/2017 : Move views reducer at top-level in reducers folder
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Create getViewAbsolutePath and getViewType simple selectors
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : Merge branch 'dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import createReducerByViews from 'store/helpers/createReducerByViews';
import view from './view';

/* --- Reducer -------------------------------------------------------------- */
export default createReducerByViews(view);

/* --- Selectors ------------------------------------------------------------ */
export const getViews = _.get('views');
export const getView = (state, { viewId }) => _.get(viewId, getViews(state));

export const getViewIsModified = createSelector(
  getView,
  _.get('isModified')
);

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewTitle = createSelector(
  getView,
  _.prop('title')
);

export const getViewAbsolutePath = createSelector(
  getView,
  _.get('absolutePath')
);

export const getViewType = createSelector(
  getView,
  _.get('type')
);

export const getViewTitleStyle = createSelector(
  getView,
  _.get('titleStyle')
);

export const getViewDomainName = createSelector(
  getView,
  _.get('domainName')
);

export const getViewSessionName = createSelector(
  getView,
  _.get('sessionName')
);

export const getLinks = createSelector(
  getView,
  _.get('links')
);

export const getLink = createSelector(
  (state, { linkId }) => linkId,
  getLinks,
  _.get
);

export const areLinksShown = createSelector(
  getView,
  _.get('showLinks')
);

export const getProcedures = createSelector(
  getView,
  _.get('procedures')
);

export const getViewIsSaved = createSelector(
  getView,
  _.anyPass([_.has('oId'), _.has('absolutePath')])
);

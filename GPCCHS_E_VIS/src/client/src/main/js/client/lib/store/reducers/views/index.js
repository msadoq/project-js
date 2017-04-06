import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import view from './view';
import createReducerByViews from '../../createReducerByViews';

/* --- Reducer -------------------------------------------------------------- */
export default createReducerByViews(view);

/* --- Selectors ------------------------------------------------------------ */
export const getViews = _.get('views');
export const getView = (state, { viewId }) => _.get(viewId, getViews(state));

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewConfiguration = createSelector(
  getView,
  _.get('configuration')
);

export const getViewContent = createSelector(
  getViewConfiguration,
  _.get('content')
);

export const getViewAbsolutePath = createSelector(
  getView,
  _.get('absolutePath')
);

export const getViewType = createSelector(
  getView,
  _.get('type')
);

export const getViewTitle = createSelector(
  getView,
  _.get('title')
);

export const getViewTitleStyle = createSelector(
  getView,
  _.get('titleStyle')
);

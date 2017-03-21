import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import view from './view';
import createReducerByViews from '../../createReducerByViews';

/* --- Reducer -------------------------------------------------------------- */
export default createReducerByViews(view);

/* --- Selectors ------------------------------------------------------------ */
export const getViews = _.prop('views');
export const getView = (state, { viewId }) => _.prop(viewId, getViews(state));

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewConfiguration = createSelector(
  getView,
  _.prop('configuration')
);

export const getViewContent = createSelector(
  getViewConfiguration,
  _.prop('content')
);

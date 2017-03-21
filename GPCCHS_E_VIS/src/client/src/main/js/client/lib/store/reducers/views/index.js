import _ from 'lodash/fp';
import view from './view';
import createReducerByViews from '../../createReducerByViews';

/* --- Reducer -------------------------------------------------------------- */
export default createReducerByViews(view);

/* --- Selectors ------------------------------------------------------------ */
export const getViews = _.prop('views');
export const getView = (state, { viewId }) => _.prop(viewId, getViews(state));

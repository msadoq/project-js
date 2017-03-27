import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getWindows } from '../../store/reducers/windows';
import { getPageViews } from '../../store/selectors/pages';

export const getPageModifiedViewsIds = createSelector(
  getPageViews,
  _.pipe(
    _.filter(view => !!view.isModified),
    _.map('uuid')
  )
);

export const getModifiedWindowsIds = createSelector(
  getWindows,
  _.pipe(
    _.pickBy(w => !!w.isModified),
    _.keys
  )
);

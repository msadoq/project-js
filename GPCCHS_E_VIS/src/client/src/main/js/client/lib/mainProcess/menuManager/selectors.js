import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPageViews } from '../../store/selectors/pages';

const getPageModifiedViewsIds = createSelector(
  getPageViews,
  _.pipe(
    _.filter(view => !!view.isModified),
    _.map('uuid')
  )
);

export default {
  getPageModifiedViewsIds,
};

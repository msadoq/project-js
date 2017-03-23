import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPageLayout } from '../../store/reducers/pages';
import { getPageViews } from '../../store/selectors/pages';
import {
  getWindowFocusedPageSelector,
} from '../../store/selectors/windows';

export const getPageLayoutWithCollapsed = createSelector(
  getPageLayout,
  layout => ({
    lg: _.map((geometry) => {
      if (geometry.collapsed) {
        return (
        Object.assign({
          minW: 3,
          minH: 1,
        }, geometry, { w: 3, h: 1 }));
      }
      return (
      Object.assign({
        minW: 3,
        minH: 3,
      }, geometry));
    }, layout),
  })
);

export const getTimebarUuid = createSelector(
  getWindowFocusedPageSelector,
  _.get('timebarUuid')
);

export const getMaximizedViewdUuid = createSelector(
  getWindowFocusedPageSelector,
  ({ layout } = {}) => {
    const viewLayout = _.find(a => a.maximized === true, layout);
    return viewLayout ? viewLayout.i : null;
  }
);

export default createSelector(
  (state, { focusedPageId }) => getPageLayoutWithCollapsed(state, { pageId: focusedPageId }),
  (state, { focusedPageId }) => getPageViews(state, { pageId: focusedPageId }),
  getTimebarUuid,
  getMaximizedViewdUuid,
  (layouts, views, timebarUuid, maximizedViewUuid) => ({
    layouts,
    views,
    timebarUuid,
    maximizedViewUuid,
  })
);

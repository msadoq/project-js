// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rename Page/ContentSelector in Page/ContentSelectors .
// VERSION : 1.1.2 : DM : #5828 : 21/04/2017 : A maximized view can be closed, it wont be taken into consideration anymore.
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPageLayout } from 'store/reducers/pages';
import {
  getWindowFocusedPageSelector,
} from 'store/selectors/windows';

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
  ({ layout, views } = {}) => {
    const viewLayout = _.find(
      a => a.maximized === true && views.includes(a.i),
      layout
    );
    return viewLayout ? viewLayout.i : null;
  }
);

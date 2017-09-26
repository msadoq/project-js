// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add partial performance widget in explorer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/health . . .
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Add number of points per view in explorer panel
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Rename dataSelector in dataSelectors .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Complete performance tab in explorer
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Add robustness code to avoid performance explorer crash
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import _has from 'lodash/fp/has';
import _get from 'lodash/fp/get';
import _set from 'lodash/fp/set';
import { getHealthMapForWindow } from '../../../store/reducers/health';
import { getWindowsVisibleViews } from '../../../store/selectors/windows';
import { getWindowFocusedPageId } from '../../../store/reducers/windows';
import { getPage } from '../../../store/reducers/pages';
import { play, pause } from '../../../store/actions/hsc';
import { updateStressProcess } from '../../../store/actions/health';
import textData from '../../../viewManager/TextView/store/dataSelectors';
import plotData from '../../../viewManager/PlotView/store/dataSelectors';
import * as constants from '../../../viewManager/constants';
import Performance from './Performance';

const mapStateToProps = (state, { windowId }) => {
  const views = getWindowsVisibleViews(state);
  const viewInfo = {
    [constants.VM_VIEW_DYNAMIC]: {},
    [constants.VM_VIEW_TEXT]: {},
    [constants.VM_VIEW_PLOT]: {},
  };
  const viewCount = {
    [constants.VM_VIEW_PLOT]: plotData.getCount(state),
    [constants.VM_VIEW_TEXT]: textData.getCount(state),
  };

  views.forEach((v) => {
    let nbPt = 1;
    if (_has([v.viewData.type, v.viewId], viewCount)) {
      nbPt = _get([v.viewData.type, v.viewId], viewCount);
    }
    _set([v.viewData.type, v.viewId], { title: v.viewData.title, nbPt }, viewInfo);
  });
  viewInfo[constants.VM_VIEW_PLOT].all = viewCount[constants.VM_VIEW_PLOT].all;
  viewInfo[constants.VM_VIEW_TEXT].all = viewCount[constants.VM_VIEW_TEXT].all;
  viewInfo[constants.VM_VIEW_DYNAMIC].all = Object.keys(viewInfo[constants.VM_VIEW_DYNAMIC]).length;

  const focusedPageId = getWindowFocusedPageId(state, { windowId });
  const focusedPage = getPage(state, { pageId: focusedPageId });
  let timebarUuid = '';
  if (focusedPage) {
    timebarUuid = focusedPage.timebarUuid;
  }

  return {
    ...getHealthMapForWindow(state, { windowId }),
    viewInfo,
    timebarUuid,
  };
};

const mapDispatchToProps = {
  updateStressProcess,
  play,
  pause,
}
;
const PerformanceContainer = connect(mapStateToProps, mapDispatchToProps)(Performance);

PerformanceContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default PerformanceContainer;

import { PropTypes } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { getHealthMapForWindow } from 'store/reducers/health';
import { getWindowsVisibleViews } from 'store/selectors/windows';
import { getWindowFocusedPageId } from 'store/reducers/windows';
import { getPage } from 'store/reducers/pages';
import { play, pause } from 'store/actions/hsc';
import { updateStressProcess } from 'store/actions/health';
import textData from 'viewManager/TextView/store/dataSelectors';
import plotData from 'viewManager/PlotView/store/dataSelectors';
import * as constants from 'viewManager/constants';
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
    const nbPt = _get(viewCount, [v.viewData.type, v.viewId], 1);
    _set(viewInfo, [v.viewData.type, v.viewId], { title: v.viewData.title, nbPt });
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

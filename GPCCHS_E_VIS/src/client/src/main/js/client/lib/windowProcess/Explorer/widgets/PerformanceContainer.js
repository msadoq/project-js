import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getHealthMapForWindow } from '../../../store/reducers/health';
import { getWindowsVisibleViews } from '../../../store/selectors/windows';
import { getWindowFocusedPageId } from '../../../store/reducers/windows';
import { getPage } from '../../../store/reducers/pages';
import { play, pause } from '../../../store/actions/hsc';
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
    if (viewCount[v.viewData.type] && viewCount[v.viewData.type][v.viewId]) {
      nbPt = viewCount[v.viewData.type][v.viewId];
    }
    viewInfo[v.viewData.type][v.viewId] = { title: v.viewData.title, nbPt };
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
    play,
    pause,
    timebarUuid,
  };
};

const PerformanceContainer = connect(mapStateToProps)(Performance);

PerformanceContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default PerformanceContainer;

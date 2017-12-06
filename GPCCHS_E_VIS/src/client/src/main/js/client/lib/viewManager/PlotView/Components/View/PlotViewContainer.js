import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isAnyInspectorOpened } from 'store/selectors/pages';
import { addEntryPoint, removeEntryPoint, saveLiveExtents,
  removeLink, updateShowLinks, toggleLegend } from 'store/actions/views';
import { pause } from 'store/actions/hsc';
import { getViewEntryPoints } from 'store/selectors/views';
import { getData } from 'viewManager/PlotView/store/dataReducer';
import { getLinks, areLinksShown } from 'store/reducers/views';
import { getInspectorEpId } from 'store/reducers/inspector';
import { getPage, getPageIdByViewId } from 'store/reducers/pages';
import { getTimebarTimelines } from 'store/reducers/timebarTimelines';
import { getTimeline } from 'store/reducers/timelines';
import { getConfigurationByViewId } from 'viewManager';
import { getTimebar, isMaxVisuDurationExceeded } from 'store/reducers/timebars';
import SizablePlotView from './PlotView';

const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  const timebar = getTimebar(state, { timebarUuid: page.timebarUuid });
  const defaultTimelineUuid = getTimebarTimelines(state, { timebarUuid: page.timebarUuid })[0];
  const defaultTimeline = getTimeline(state, { timelineUuid: defaultTimelineUuid });
  return {
    configuration: getConfigurationByViewId(state, { viewId }),
    entryPoints: getViewEntryPoints(state, { viewId }),
    data: getData(state, { viewId }),
    visuWindow: timebar ? timebar.visuWindow : null,
    isInspectorOpened: isAnyInspectorOpened(state),
    defaultTimelineId: defaultTimeline ? defaultTimeline.id : null,
    inspectorEpId: getInspectorEpId(state),
    links: getLinks(state, { viewId }),
    pageId,
    showLinks: areLinksShown(state, { viewId }),
    isMaxVisuDurationExceeded: isMaxVisuDurationExceeded(state,
      { timebarUuid: page.timebarUuid, viewType: 'PlotView' }),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  saveLiveExtents,
  pause,
  addEntryPoint,
  removeEntryPoint,
  removeLink,
  updateShowLinks,
  toggleLegend,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);

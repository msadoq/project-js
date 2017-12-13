// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Renamed GrizzlyPlot and RSCPlot with coherent names.
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving DynamicView PlotView and TextView in dataManager.
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Move general variables at top level of a view
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix open editor when entrypoint is dropped
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : move selector from containers to reducers / spectify selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add context menu on views
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : mark parameter as checked in context menu when opened in inspector
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Ported 1.1.0 patch to dev branch. EP Drag & drop auto-axis-creation.
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : Fix editor search on open
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : fix context menu on plot view
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : User can now show/hide/remove EP from Plot in legend.
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Improve PlotView editor UI -> legend in store.
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to limit visuWindow per view
// END-HISTORY
// ====================================================================

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

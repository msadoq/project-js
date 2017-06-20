import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SizablePlotView from './PlotView';
import { addEntryPoint, removeEntryPoint, removeLink, updateShowLinks, toggleLegend }
  from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';
import { getTimebar } from '../../../../store/reducers/timebars';
import { getInspectorEpId } from '../../../../store/reducers/inspector';
import { getPage, getPageIdByViewId } from '../../../../store/reducers/pages';
import { getTimebarTimelines } from '../../../../store/reducers/timebarTimelines';
import { getTimeline } from '../../../../store/reducers/timelines';
import { getConfigurationByViewId } from '../../../../viewManager';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';
import { getLinks, areLinksShown } from '../../../../store/reducers/views';

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
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addEntryPoint,
  removeEntryPoint,
  removeLink,
  updateShowLinks,
  toggleLegend,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);

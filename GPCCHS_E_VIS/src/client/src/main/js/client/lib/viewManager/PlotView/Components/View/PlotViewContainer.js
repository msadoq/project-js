import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SizablePlotView from './PlotView';
import { addEntryPoint, updateEditorSearch } from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';
import { getTimebar } from '../../../../store/reducers/timebars';
import { getInspectorRemoteId } from '../../../../store/reducers/inspector';
import { getPage, getPageIdByViewId } from '../../../../store/reducers/pages';
import { getTimebarTimelines } from '../../../../store/reducers/timebarTimelines';
import { getTimeline } from '../../../../store/reducers/timelines';
import { getConfigurationByViewId } from '../../../../viewManager';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';

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
    inspectorRemoteId: getInspectorRemoteId(state),
    defaultTimelineId: defaultTimeline ? defaultTimeline.id : null,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  addEntryPoint,
  updateEditorSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);

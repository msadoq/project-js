import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SizablePlotView from './PlotView';
import { addEntryPoint, updateEditorSearch } from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';
import { getTimebar } from '../../../../store/reducers/timebars';
import { getInspectorRemoteId } from '../../../../store/reducers/inspector';
import { getPage, getPageIdByViewId } from '../../../../store/reducers/pages';
import { getConfigurationByViewId } from '../../../../viewManager';
import { isAnyInspectorOpened } from '../../../../store/selectors/pages';

const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  const timebar = getTimebar(state, { timebarUuid: page.timebarUuid });

  return {
    configuration: getConfigurationByViewId(state, { viewId }),
    entryPoints: getViewEntryPoints(state, { viewId }),
    data: getData(state, { viewId }),
    visuWindow: timebar ? timebar.visuWindow : null,
    isInspectorOpened: isAnyInspectorOpened(state),
    inspectorRemoteId: getInspectorRemoteId(state),
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  addEntryPoint: data => addEntryPoint(viewId, data),
  updateEditorSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);

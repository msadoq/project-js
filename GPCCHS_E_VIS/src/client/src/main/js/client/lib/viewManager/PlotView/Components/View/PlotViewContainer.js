import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SizablePlotView from './PlotView';
import { addEntryPoint } from '../../../../store/actions/views';
import {
  openEditor,
} from '../../../../store/actions/pages';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';
import { getTimebar } from '../../../../store/reducers/timebars';
import { getPage, getPageIdByViewId } from '../../../../store/reducers/pages';

const mapStateToProps = (state, { viewId }) => {
  const getConfiguration = _.get(`views[${viewId}].configuration`);
  const data = getData(state, { viewId });
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  const timebar = getTimebar(state, { timebarUuid: page.timebarUuid });

  return {
    configuration: getConfiguration(state),
    entryPoints: getViewEntryPoints(state, { viewId }),
    data,
    visuWindow: timebar ? timebar.visuWindow : null,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  addEntryPoint: data => addEntryPoint(viewId, data),
  openEditor: () => openEditor(undefined, viewId),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);

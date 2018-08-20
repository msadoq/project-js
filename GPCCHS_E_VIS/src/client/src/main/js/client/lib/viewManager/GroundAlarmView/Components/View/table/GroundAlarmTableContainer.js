import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getInspectorOptions, getDataRows } from 'viewManager/GroundAlarmView/store/selectors';
import { getIsPlaying } from 'store/reducers/hsc';
import { getData } from 'viewManager/GroundAlarmView/store/dataReducer';
import { getSelectedAlarms, getExpandedAlarms, getSort } from 'viewManager/GroundAlarmView/store/uiReducer';
import {
  openAckModal,
  collapseAlarm, uncollapseAlarm,
  toggleSelection,
  toggleSort,
  inputSearch,
  inputResetAll,
  inputToggle,
} from 'viewManager/GroundAlarmView/store/actions';
import { getAlarmDomain, getAlarmTimeline, getAlarmMode, getSearch, getEnableSearch, getColumns } from 'viewManager/GroundAlarmView/store/configurationReducer';
import GroundAlarmTable from './GroundAlarmTable';

const mapStateToProps = createStructuredSelector({
  sort: getSort,
  mode: getAlarmMode,
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  rows: getDataRows,
  expandedAlarms: getExpandedAlarms,
  selectedAlarms: getSelectedAlarms,
  indexedRows: _.compose(_.prop('lines'), getData),
  inspectorOptions: getInspectorOptions,
  isPlayingTimebar: getIsPlaying,
  search: getSearch,
  enableSearch: getEnableSearch,
  columns: getColumns,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  openAckModal: selectedAlarms => dispatch(openAckModal(viewId, selectedAlarms)),
  collapse: oid => dispatch(collapseAlarm(viewId, oid)),
  uncollapse: oid => dispatch(uncollapseAlarm(viewId, oid)),
  toggleSelection: oid => dispatch(toggleSelection(viewId, oid)),
  toggleSort: column => dispatch(toggleSort(viewId, column)),
  inputSearch: (column, value) => dispatch(inputSearch(viewId, column, value)),
  inputResetAll: () => dispatch(inputResetAll(viewId)),
  inputToggle: () => dispatch(inputToggle(viewId)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  openInspector: (parameterName) => {
    const inspectorOptions = _.set(['dataId', 'parameterName'], parameterName, stateProps.inspectorOptions);
    return ownProps.openInspector(inspectorOptions);
  },
});

const GroundAlarmTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(GroundAlarmTable);

GroundAlarmTableContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmTableContainer;

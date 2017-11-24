import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmTable from './GroundAlarmTable';
import { getAlarmDomain, getAlarmTimeline, getAlarmMode } from '../../../store/configurationReducer';
import { getData } from '../../../store/dataReducer';
import { getSelectedAlarms, getSort } from '../../../store/uiReducer';
import { openAckModal, collapseAlarm, uncollapseAlarm, toggleSelection, toggleSort } from '../../../store/actions';
import { getInspectorOptions, getDataRows } from '../../../store/selectors';
import { getIsPlaying } from '../../../../../store/reducers/hsc';

const mapStateToProps = createStructuredSelector({
  sort: getSort,
  mode: getAlarmMode,
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  rows: getDataRows,
  selectedAlarms: getSelectedAlarms,
  indexedRows: _.compose(_.prop('lines'), getData),
  inspectorOptions: getInspectorOptions,
  isPlayingTimebar: getIsPlaying,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  openAckModal: _.compose(dispatch, openAckModal),
  collapse: oid => dispatch(collapseAlarm(viewId, oid)),
  uncollapse: oid => dispatch(uncollapseAlarm(viewId, oid)),
  toggleSelection: oid => dispatch(toggleSelection(viewId, oid)),
  toggleSort: column => dispatch(toggleSort(viewId, column)),
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

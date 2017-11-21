import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import OnboardAlarmTable from './OnboardAlarmTable';
import { getAlarmDomain, getAlarmTimeline, getAlarmMode } from '../../../store/configurationReducer';
import { getData, getDataLines } from '../../../store/dataReducer';
import { openAckModal } from '../../../store/actions';
import { getSelectedAlarms, getSort } from '../../../../GroundAlarmView/store/uiReducer';
import { collapseAlarm, uncollapseAlarm, toggleSelection, toggleSort } from '../../../../GroundAlarmView/store/actions';
import { getInspectorOptions } from '../../../../GroundAlarmView/store/selectors';
import { getIsPlaying } from '../../../../../store/reducers/hsc';

const mapStateToProps = createStructuredSelector({
  sort: getSort,
  mode: getAlarmMode,
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  lines: getDataLines,
  selectedAlarms: getSelectedAlarms,
  indexedLines: _.compose(_.prop('lines'), getData),
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

const OnboardAlarmTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(OnboardAlarmTable);

OnboardAlarmTableContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default OnboardAlarmTableContainer;

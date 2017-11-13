import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import OnboardAlarmTable from './OnboardAlarmTable';
import { getAlarmDomain, getAlarmTimeline, getAlarmMode } from '../../../store/configurationReducer';
import { getDataLines } from '../../../store/dataReducer';
import { openAckModal } from '../../../store/actions';
import { collapseAlarm, uncollapseAlarm } from '../../../../GroundAlarmView/store/actions';
import { getInspectorOptions } from '../../../../GroundAlarmView/store/selectors';

const mapStateToProps = createStructuredSelector({
  mode: getAlarmMode,
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  lines: getDataLines,
  inspectorOptions: getInspectorOptions,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  openAckModal: _.compose(dispatch, openAckModal),
  collapse: oid => dispatch(collapseAlarm(viewId, oid)),
  uncollapse: oid => dispatch(uncollapseAlarm(viewId, oid)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  openInspector: () => ownProps.openInspector(stateProps.inspectorOptions),
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

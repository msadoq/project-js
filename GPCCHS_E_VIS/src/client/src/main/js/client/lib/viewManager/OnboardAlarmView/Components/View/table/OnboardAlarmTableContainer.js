import _ from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import OnboardAlarmTable from './OnboardAlarmTable';
import { getAlarmDomain, getAlarmTimeline, getAlarmMode } from '../../../store/configurationReducer';
import { getDataLines } from '../../../store/dataReducer';
import { collapseAlarm, uncollapseAlarm } from '../../../../GroundAlarmView/store/actions';
import { openAckModal } from '../../..//store/actions';

const mapStateToProps = createStructuredSelector({
  mode: getAlarmMode,
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  lines: getDataLines,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  openAckModal: _.compose(dispatch, openAckModal),
  collapse: oid => dispatch(collapseAlarm(viewId, oid)),
  uncollapse: oid => dispatch(uncollapseAlarm(viewId, oid)),
});

const OnboardAlarmTableContainer = connect(mapStateToProps, mapDispatchToProps)(OnboardAlarmTable);

OnboardAlarmTableContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default OnboardAlarmTableContainer;

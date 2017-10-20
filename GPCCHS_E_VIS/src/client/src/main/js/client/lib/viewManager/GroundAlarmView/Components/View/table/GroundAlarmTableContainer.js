import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmTable from './GroundAlarmTable';
import { getAlarmDomain, getAlarmTimeline } from '../../../store/configurationReducer';
import { getDataLines } from '../../../store/dataReducer';
import { openAckModal } from '../../../store/actions';

const mapStateToProps = createStructuredSelector({
  domain: getAlarmDomain,
  timeline: getAlarmTimeline,
  lines: getDataLines,
});

const mapDispatchToProps = {
  openAckModal,
};

const GroundAlarmTableContainer = connect(mapStateToProps, mapDispatchToProps)(GroundAlarmTable);

GroundAlarmTableContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmTableContainer;

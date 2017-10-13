import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import GroundAlarmTable from './GroundAlarmTable';
import { getDataLines } from '../../../store/dataReducer';

const mapStateToProps = createStructuredSelector({
  lines: getDataLines,
});

const GroundAlarmTableContainer = connect(mapStateToProps)(GroundAlarmTable);

GroundAlarmTableContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default GroundAlarmTableContainer;

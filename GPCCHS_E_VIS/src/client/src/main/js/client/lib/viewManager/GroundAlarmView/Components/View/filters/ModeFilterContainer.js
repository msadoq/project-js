import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ModeFilter from './ModeFilter';
import { getAlarmMode } from '../../../store/configurationReducer';

import * as actions from '../../../store/actions';


const mapStateToProps = createStructuredSelector({
  mode: getAlarmMode,
});

const mapDispatchToProps = (dispatch, { viewId }) => ({
  updateMode: mode => dispatch(actions.updateAlarmMode(viewId, mode)),
});


const ModeFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeFilter);

ModeFilterContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default ModeFilterContainer;

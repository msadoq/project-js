import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HistoryView from './HistoryView';
import { getData } from '../../store/dataReducer';

const mapStateToProps = createStructuredSelector({
  data: getData,
});

const HistoryViewContainer = connect(mapStateToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default HistoryViewContainer;

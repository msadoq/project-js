import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getData } from 'viewManager/HistoryView/store/dataReducer';
import HistoryView from './HistoryView';

const mapStateToProps = createStructuredSelector({
  data: getData,
});

const HistoryViewContainer = connect(mapStateToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default HistoryViewContainer;

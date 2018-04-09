/* eslint-disable quote-props,no-unused-vars */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData, getConfiguration } from 'viewManager/HistoryView/store/dataReducer';
import { toggleColumnSort, filterColumn, scrollRows } from 'store/actions/tableColumns';
import formatData from '../../data/formatData';
import HistoryView from './HistoryView';


const mapStateToProps = (state, { viewId }) => {
  const config = getConfiguration(state, { viewId });
  const data = getData(state, { viewId });
  return {
    config,
    data: formatData(data, config),
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onFilter: (col, value) => {
    dispatch(filterColumn(viewId, col, value));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, col, mode));
  },
  onScroll: (offset) => {
    dispatch(scrollRows(viewId, offset));
  },
});

const HistoryViewContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default HistoryViewContainer;

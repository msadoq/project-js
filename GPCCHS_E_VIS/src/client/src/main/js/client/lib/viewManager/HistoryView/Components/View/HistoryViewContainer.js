/* eslint-disable quote-props,no-unused-vars */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getData } from 'viewManager/HistoryView/store/dataReducer';
import HistoryView from './HistoryView';

// Test DATA , @TODO: clean up
const DATA = {
  length: 2,
  groups: {
    'Default': {
      size: 3,
      cols: {
        'Default-C1': [0, 5],
        'Default-C2': [1, 6],
        'Default-C3': [2, 7],
      },
    },
    'Other': {
      size: 2,
      cols: {
        'Other-C1': [3, 8],
        'Other-C2': [4, 9],
      },
    },
  },
};

const mapStateToProps = (state, props) => ({
  data: DATA,
});

const HistoryViewContainer = connect(mapStateToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default HistoryViewContainer;

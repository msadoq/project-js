// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PacketView from './PacketView';


const mapStateToProps = createStructuredSelector({
  data: () => ({
    indexes: {},
    values: {},
  }),
});

const PacketViewContainer = connect(mapStateToProps)(PacketView);

PacketViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PacketViewContainer;

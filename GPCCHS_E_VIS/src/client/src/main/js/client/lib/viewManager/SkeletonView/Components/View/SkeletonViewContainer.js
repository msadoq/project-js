// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Add basic SkeletonView . .
// END-HISTORY
// ====================================================================

import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import SkeletonView from './SkeletonView';


const mapStateToProps = createStructuredSelector({
  data: () => ({
    indexes: {},
    values: {},
  }),
});

const SkeletonViewContainer = connect(mapStateToProps)(SkeletonView);

SkeletonViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default SkeletonViewContainer;

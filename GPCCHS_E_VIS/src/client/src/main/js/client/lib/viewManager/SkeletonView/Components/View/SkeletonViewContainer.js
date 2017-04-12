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

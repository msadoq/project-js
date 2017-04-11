import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PacketView from './PacketView';


const mapStateToProps = createStructuredSelector({
  data: {
    indexes: {},
    values: {},
  },
});

const PacketViewContainer = connect(mapStateToProps)(PacketView);

PacketViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};
export default PacketViewContainer;

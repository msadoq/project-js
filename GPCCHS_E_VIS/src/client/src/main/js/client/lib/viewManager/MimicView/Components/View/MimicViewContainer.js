import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import MimicView from './MimicView';

const MimicViewContainer = props => <MimicView {...props} />;

function mapStateToProps(state, { viewId, type }) {
  const { title, configuration } = getView(state, viewId);

  return {
    viewId,
    type,
    title,
    configuration,
  };
}

DynamicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export const MimicViewContainer = connect(mapStateToProps, null)(MimicView);
export default connect(mapStateToProps)(MimicViewContainer);

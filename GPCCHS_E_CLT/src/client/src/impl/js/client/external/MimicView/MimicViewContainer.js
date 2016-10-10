import React from 'react';
import { connect } from 'react-redux';
import { getView } from '../../lib/store/selectors/views';
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

export default connect(mapStateToProps)(MimicViewContainer);

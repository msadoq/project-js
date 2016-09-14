import React from 'react';
import { connect } from 'react-redux';
import { getView } from '../../app/store/mutations/viewReducer';
import TextView from './TextView';

const TextViewContainer = props => <TextView {...props} />;

function mapStateToProps(state, { viewId, type }) {
  const { title, configuration } = getView(state, viewId);

  return {
    viewId,
    type,
    title,
    configuration,
  };
}

export default connect(mapStateToProps)(TextViewContainer);

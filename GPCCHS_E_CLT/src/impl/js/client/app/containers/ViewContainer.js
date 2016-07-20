import React from 'react';
import View from '../components/View';
import { connect } from 'react-redux';
import { updateContent } from '../actions/views';

const ViewContainer = props => <View {...props} />;

function mapStateToProps(state, ownProps) {
  const element = state.views[ownProps.viewId];
  return {
    viewIdId: ownProps.viewId,
    title: element.title,
    content: element.content,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateContent: content => dispatch(updateContent(ownProps.viewId, content)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);

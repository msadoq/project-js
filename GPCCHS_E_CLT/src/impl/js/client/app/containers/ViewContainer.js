import React from 'react';
import View from '../components/View';
import { connect } from 'react-redux';
import { updateContent } from '../actions/views';
import { openEditor } from '../actions/pages';
import _ from 'lodash';

const ViewContainer = props => <View {...props} />;

function mapStateToProps(state, ownProps) {
  const element = state.views[ownProps.viewId];
  return {
    viewIdId: ownProps.viewId,
    type: element.type,
    title: element.title,
    content: element.content,
    subscriptions: _.pick(state.subscriptions, element.subscriptions),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateContent: content => dispatch(updateContent(ownProps.viewId, content)),
    openEditor: () => dispatch(openEditor(ownProps.pageId, ownProps.viewId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);

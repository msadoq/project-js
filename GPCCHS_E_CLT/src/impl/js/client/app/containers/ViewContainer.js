import React from 'react';
import _ from 'lodash';
import View from '../components/View';
import { connect } from 'react-redux';
import { openEditor } from '../store/mutations/pageActions';

const ViewContainer = props => <View {...props} />;

function mapStateToProps(state, ownProps) {
  const element = state.views[ownProps.viewId];

  const points = (state.plots[ownProps.viewId] && state.plots[ownProps.viewId].points)
    ? _.toArray(state.plots[ownProps.viewId].points)
    : [];

  return {
    viewId: ownProps.viewId,
    type: element.type,
    title: element.title,
    content: element.content,
    subscriptions: element.subscriptions,
    visible: element.visible,
    waiting: element.waiting,
    points,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    openEditor: () => dispatch(openEditor(ownProps.pageId, ownProps.viewId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);

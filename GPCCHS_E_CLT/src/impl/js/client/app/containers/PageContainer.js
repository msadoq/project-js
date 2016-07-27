import React from 'react';
import Page from '../components/Page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addView, delView } from '../actions/views';
import { mountView, unmountView } from '../actions/pages';

const PageContainer = props => <Page {...props} />;

function mapStateToProps(state, ownProps) {
  const element = state.pages[ownProps.pageId];
  return {
    pageId: ownProps.pageId,
    title: element.title,
    editor: element.editor,
    views: element.views,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    addView,
    delView,
    mountView: viewId => mountView(viewId, ownProps.pageId),
    unmountView: viewId => unmountView(viewId, ownProps.pageId),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);

import React from 'react';
import Page from '../components/Page';
import { connect } from 'react-redux';

const PageContainer = props => <Page {...props} />;

function mapStateToProps(state, ownProps) {
  const element = state.pages[ownProps.pageId];
  return {
    pageId: ownProps.pageId,
    title: element.title,
    views: element.views,
  };
}

export default connect(mapStateToProps)(PageContainer);

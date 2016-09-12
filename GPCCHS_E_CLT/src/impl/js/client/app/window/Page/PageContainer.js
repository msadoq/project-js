import React from 'react';
import Page from './Page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViews } from '../../store/mutations/pageReducer';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/mutations/pageActions';

const PageContainer = props => <Page {...props} />;

const mapStateToProps = (state, { pageId }) => {
  const page = state.pages[pageId];
  const views = getViews(state, pageId);
  return { page, views, layout: page.layout };
};

function mapDispatchToProps(dispatch, { pageId }) {
  return bindActionCreators({
    addAndMount: viewId => addAndMount(viewId, pageId),
    unmountAndRemove: viewId => unmountAndRemove(viewId, pageId),
    updateLayout: layout => updateLayout(pageId, layout),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);

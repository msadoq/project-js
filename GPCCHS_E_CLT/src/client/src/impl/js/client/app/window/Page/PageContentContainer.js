import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageContent from './PageContent';
import { getViews } from '../../store/mutations/pageReducer';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/mutations/pageActions';

const PageContentContainer = props => <PageContent {...props} />;

const mapStateToProps = (state, ownProps) => {
  const page = state.pages[ownProps.pageId];
  const views = getViews(state, ownProps.pageId);
  return { ...ownProps, page, views, layout: page.layout };
};

function mapDispatchToProps(dispatch, { pageId }) {
  return bindActionCreators({
    addAndMount: () => addAndMount(pageId),
    unmountAndRemove: viewId => unmountAndRemove(pageId, viewId),
    updateLayout: layout => updateLayout(pageId, layout),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentContainer);

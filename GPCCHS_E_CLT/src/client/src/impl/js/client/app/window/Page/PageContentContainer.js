import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViews } from '../../store/mutations/pageReducer';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/mutations/pageActions';

import PageContent from './PageContent';

import styles from './Page.css'

const PageContentContainer = props => props.focusedPage
  ? <PageContent {...props} />
  : <div className={styles.noPage}>No page ...</div>;

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.focusedPage) {
    return ownProps;
  }

  const views = getViews(state, ownProps.focusedPageId);
  return { ...ownProps, views };
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

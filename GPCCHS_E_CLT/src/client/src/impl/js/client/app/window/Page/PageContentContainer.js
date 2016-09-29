import React from 'react';
import PageContent from './PageContent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViews } from '../../store/mutations/pageReducer';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/mutations/pageActions';
import styles from './Page.css'

// const { dialog } = require('electron').remote;

const PageContentContainer = props => ((props.page)
  ? <PageContent {...props} />
  : <div className={styles.nopage_background}>
    <div className={styles.nopage_transbox}>
      <p> No page ... </p>
    </div>)
  </div>);

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.pageId) {
    return ownProps;
  }

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

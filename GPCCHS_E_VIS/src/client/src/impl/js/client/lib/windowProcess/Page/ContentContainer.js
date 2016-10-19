import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeGetLayouts, makeGetViews } from '../../store/selectors/pages';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/actions/pages';

import Content from './Content';

import styles from './Content.css';

const getLayouts = makeGetLayouts();
const getViews = makeGetViews();

const PageContentContainer = props => (
  (props.focusedPage)
    ? <Content {...props} />
    : <div className={styles.noPage}>No page ...</div>
);

PageContentContainer.propTypes = {
  focusedPage: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.focusedPage) {
    return undefined;
  }

  const p = { pageId: ownProps.focusedPageId };
  return {
    layouts: getLayouts(state, p),
    views: getViews(state, p),
  };
};

function mapDispatchToProps(dispatch, { focusedPageId }) {
  return bindActionCreators({
    addAndMount: () => addAndMount(focusedPageId),
    unmountAndRemove: viewId => unmountAndRemove(focusedPageId, viewId),
    updateLayout: layout => updateLayout(focusedPageId, layout),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContentContainer);

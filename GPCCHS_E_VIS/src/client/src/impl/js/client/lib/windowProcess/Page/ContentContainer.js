import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViews } from '../../store/selectors/pages';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/actions/pages';

import Content from './Content';

import styles from './Content.css';

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
    return ownProps;
  }

  const views = getViews(state, ownProps.focusedPageId);
  return { views };
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

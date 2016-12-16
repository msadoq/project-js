import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeGetLayouts, makeGetViews } from '../../store/selectors/pages';
import { addAndMount, unmountAndRemove, updateLayout } from '../../store/actions/pages';
import {
  getWindowFocusedPageSelector,
} from '../../store/selectors/windows';

import Content from './Content';

const getLayouts = makeGetLayouts();
const getViews = makeGetViews();

const mapStateToProps = (state, { windowId, focusedPageId }) => {
  if (!focusedPageId) {
    return {};
  }
  const focusedPage = getWindowFocusedPageSelector(state, windowId);
  const p = { pageId: focusedPageId };
  const views = getViews(state, p);
  const layouts = getLayouts(state, p);

  return {
    timebarId: focusedPage.timebarId,
    layouts,
    views,
  };
};

function mapDispatchToProps(dispatch, { focusedPageId }) {
  return bindActionCreators({
    addAndMount: () => addAndMount(focusedPageId),
    unmountAndRemove: viewId => unmountAndRemove(focusedPageId, viewId),
    updateLayout: layout => updateLayout(focusedPageId, layout),
  }, dispatch);
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  focusedPageId: PropTypes.string.isRequired
};

export default ContentContainer;

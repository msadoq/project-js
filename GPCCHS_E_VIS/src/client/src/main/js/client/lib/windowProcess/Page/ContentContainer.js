import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeGetLayouts, makeGetViews } from '../../store/selectors/pages';
import { updateLayout } from '../../store/actions/pages';
import { closeView } from '../../store/actions/views';
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
  const focusedPage = getWindowFocusedPageSelector(state, { windowId });
  const views = getViews(state, { pageId: focusedPageId });
  const layouts = getLayouts(state, { pageId: focusedPageId });

  return {
    timebarUuid: focusedPage ? focusedPage.timebarUuid : undefined,
    layouts,
    views,
  };
};

function mapDispatchToProps(dispatch, { focusedPageId }) {
  return bindActionCreators({
    unmountAndRemove: viewId => closeView(focusedPageId, viewId),
    updateLayout: layout => updateLayout(focusedPageId, layout),
  }, dispatch);
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  focusedPageId: PropTypes.string,
};

export default ContentContainer;

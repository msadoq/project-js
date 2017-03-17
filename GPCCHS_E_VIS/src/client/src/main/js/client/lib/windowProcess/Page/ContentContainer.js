import _ from 'lodash/fp';
import { createSelector } from 'reselect';
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

const getTimebarUuid = createSelector(
  getWindowFocusedPageSelector,
  _.get('timebarUuid')
);

const getMaximizeViewdUuid = createSelector(
  getWindowFocusedPageSelector,
  ({ layout }) => {
    const viewLayout = layout.find(a => a.maximized === true);
    return viewLayout ? viewLayout.i : null;
  }
);

const mapStateToProps = createSelector(
  (state, { focusedPageId }) => getLayouts(state, { pageId: focusedPageId }),
  (state, { focusedPageId }) => getViews(state, { pageId: focusedPageId }),
  getTimebarUuid,
  getMaximizeViewdUuid,
  (layouts, views, timebarUuid, maximizedViewUuid) => ({
    layouts,
    views,
    timebarUuid,
    maximizedViewUuid,
  })
);

function mapDispatchToProps(dispatch, { focusedPageId }) {
  return bindActionCreators({
    closeView: viewId => closeView(focusedPageId, viewId),
    updateLayout: layout => updateLayout(focusedPageId, layout),
  }, dispatch);
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  focusedPageId: PropTypes.string,
};

export default ContentContainer;

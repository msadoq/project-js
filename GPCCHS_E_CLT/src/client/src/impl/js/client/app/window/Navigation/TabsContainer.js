import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPages } from '../../store/selectors/windows';
import { focusPage, addAndMount, unmountAndRemove } from '../../store/actions/windows';
import Tabs from './Tabs';

const TabsContainer = props => <Tabs {...props} />;

function mapStateToStore(state, { windowId, focusedPageId }) {
  return ({
    pages: getPages(state, windowId),
    focusedPageId,
  });
}

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    focusPage: pageId => focusPage(windowId, pageId),
    addAndMount: () => addAndMount(windowId),
    removeAndUnmountPage: pageId => unmountAndRemove(windowId, pageId),
  }, dispatch);
}

export default connect(mapStateToStore, mapDispatchToProps)(TabsContainer);

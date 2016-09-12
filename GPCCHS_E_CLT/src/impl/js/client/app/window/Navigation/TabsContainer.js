import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFocusedPage, getPages } from '../../store/mutations/windowReducer';
import { focusPage } from '../../store/mutations/windowActions';
import { addAndMount, unmountAndRemove } from '../../store/mutations/windowActions';
import Tabs from './Tabs';

const TabsContainer = props => <Tabs {...props} />;

function mapStateToStore(state, { windowId }) {
  return ({
    pages: getPages(state, windowId),
    focusedPage: getFocusedPage(state, windowId),
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

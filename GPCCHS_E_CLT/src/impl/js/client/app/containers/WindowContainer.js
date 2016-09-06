import React from 'react';
import Window from '../components/Window';
import { focusPage, addWindow, delWindow, mountPage, unmountPage } from '../store/actions/windows';
import { addPage, delPage } from '../store/actions/pages';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const WindowContainer = props => <Window {...props} />;

function mapStateToProps(state, ownProps) {
  const window = state.windows[ownProps.windowId];

  const pages = window.pages.reduce((list, pageId) => {
    if (!state.pages[pageId]) {
      return list;
    }

    return list.concat(({
      pageId,
      title: state.pages[pageId].title,
    }));
  }, []);

  return {
    windowId: ownProps.windowId,
    title: window.title,
    focusedTab: window.focusedTab,
    pages,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators({
    focusPage: pageId => focusPage(pageId, ownProps.windowId),
    addWindow,
    delWindow,
    mountPage: pageId => mountPage(pageId, ownProps.windowId),
    unmountPage: pageId => unmountPage(pageId, ownProps.windowId),
    addPage,
    delPage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowContainer);

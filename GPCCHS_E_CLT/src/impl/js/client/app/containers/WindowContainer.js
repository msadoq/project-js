import React from 'react';
import Window from '../components/Window';
import { changePage, addWindow, delWindow } from '../actions/windows';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const WindowContainer = props => <Window {...props} />;

function mapStateToProps(state, ownProps) {
  const element = state.windows[ownProps.windowId];
  return {
    windowId: ownProps.windowId,
    title: element.title,
    selectedTab: element.selectedTab,
    pages: element.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePage,
    addWindow,
    delWindow,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowContainer);

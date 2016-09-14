import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Window from './Window';
import { getFocusedPage } from '../../store/mutations/windowReducer';

const WindowContainer = props => <Window {...props} />;

function mapStateToProps(state, { windowId }) {
  return {
    windowId,
    pageId: getFocusedPage(state, windowId),
  };
}

export default connect(mapStateToProps)(WindowContainer);

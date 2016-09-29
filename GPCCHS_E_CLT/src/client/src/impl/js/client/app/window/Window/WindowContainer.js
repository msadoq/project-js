import React from 'react';
import { connect } from 'react-redux';
import Window from './Window';
import { getFocusedPage } from '../../store/mutations/windowReducer';

const { dialog } = require('electron').remote.dialog;

const WindowContainer = props => <Window {...props} />;

function mapStateToProps(state, { windowId }) {
  return {
    windowId,
    pageId: getFocusedPage(state, windowId),
  };
}

export default connect(mapStateToProps)(WindowContainer);

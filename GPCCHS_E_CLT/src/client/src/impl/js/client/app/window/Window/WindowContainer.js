import React from 'react';
import { connect } from 'react-redux';
import {
  getWindowFocusedPageId,
  makeGetWindowFocusedPage,
} from '../../store/mutations/windowReducer';

import Window from './Window';

const WindowContainer = props => <Window {...props} />;


const makeMapStateToProps = () => {
  const focusedPageSelector = makeGetWindowFocusedPage();
  return (state, props) => {
    return {
      windowId: props.windowId,
      focusedPageId: getWindowFocusedPageId(state, props),
      focusedPage: focusedPageSelector(state, props),
    };
  };
};

export default connect(makeMapStateToProps)(WindowContainer);

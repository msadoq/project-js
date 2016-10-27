import React from 'react';
import { connect } from 'react-redux';
import {
  getWindowFocusedPageId,
  getWindowFocusedPageSelector,
} from '../../store/selectors/windows';

import Window from './Window';

const WindowContainer = props => <Window {...props} />;

const mapStateToProps = (state, props) => ({
  focusedPageId: getWindowFocusedPageId(state, props),
  focusedPage: getWindowFocusedPageSelector(state, props)
});

export default connect(mapStateToProps)(WindowContainer);

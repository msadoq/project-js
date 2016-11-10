import React from 'react';
import { connect } from 'react-redux';
import { getStatus } from '../../store/selectors/hsc';
import {
  getWindowFocusedPageId,
  getWindowFocusedPageSelector,
} from '../../store/selectors/windows';

import Window from './Window';

const WindowContainer = props => <Window {...props} />;

const mapStateToProps = (state, props) => ({
  appStatus: getStatus(state),
  focusedPageId: getWindowFocusedPageId(state, props),
  focusedPage: getWindowFocusedPageSelector(state, props),
  timelines: state.timelines,
});

export default connect(mapStateToProps)(WindowContainer);

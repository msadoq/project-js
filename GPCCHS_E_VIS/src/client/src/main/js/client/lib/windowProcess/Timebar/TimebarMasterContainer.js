import { connect } from 'react-redux';
import React from 'react';
import _get from 'lodash/get';
import { getTimebar } from '../../store/reducers/timebars';
import TimebarContainer from './TimebarContainer';
import SelectTimebarContainer from './SelectTimebarContainer';

export default connect(
  (state, { pageId }) => {
    const focusedPage = _get(state, ['pages', pageId]);
    if (!focusedPage) {
      return { timebars: state.timebars };
    }
    const { timebarUuid, timebarHeight, timebarCollapsed } = focusedPage;
    const timebar = getTimebar(state, { timebarUuid });

    // Will render SelectTimebarContainer
    if (!timebar) {
      return {
        timebars: state.timebars,
      };
    }

    // Will render TimebarContainer
    return {
      timebar,
      timebarHeight,
      timebarCollapsed,
    };
  }
)(
  props => (props.timebar
  ? <TimebarContainer {...props} />
  : <SelectTimebarContainer {...props} />)
);

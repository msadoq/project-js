import { connect } from 'react-redux';
import React from 'react';
import { getPage } from 'store/reducers/pages';
import { getTimebar, getTimebars } from 'store/reducers/timebars';
import TimebarContainer from './TimebarContainer';
import SelectTimebarContainer from './SelectTimebarContainer';

export default connect(
  (state, { pageId }) => {
    const focusedPage = getPage(state, { pageId });
    const timebars = getTimebars(state);
    if (!focusedPage) {
      return { timebars };
    }
    const { timebarUuid, timebarHeight, timebarCollapsed } = focusedPage;
    const timebar = getTimebar(state, { timebarUuid });

    // Will render SelectTimebarContainer
    if (!timebar) {
      return { timebars };
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

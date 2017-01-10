import { connect } from 'react-redux';
import React from 'react';
import _get from 'lodash/get';
import { getTimebar } from '../../store/selectors/timebars';
import TimebarContainer from './TimebarContainer';
import SelectTimebarContainer from './SelectTimebarContainer';

export default connect(
  (state, { focusedPageId }) => {
    const focusedPage = _get(state, ['pages', focusedPageId]);
    if (!focusedPage) {
      return { timebars: state.timebars };
    }
    const { timebarId, timebarHeight } = focusedPage;
    const timebar = getTimebar(state, timebarId);

    // Will render SelectTimebarContainer
    if (!timebar) {
      return {
        timebars: state.timebars
      };
    }

    // Will render TimebarContainer
    return {
      timebar,
      timebarId,
      timebarHeight,
    };
  }
)(props => (props.timebar ?
  <TimebarContainer {...props} /> : <SelectTimebarContainer {...props} />)
);

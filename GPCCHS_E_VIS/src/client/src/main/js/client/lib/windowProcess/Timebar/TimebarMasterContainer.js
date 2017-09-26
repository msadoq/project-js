// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Removed timeline.timelineUuid, already has timeline.uuid .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Using selectors in TimebarMasterContainer .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import React from 'react';
import { getPage } from '../../store/reducers/pages';
import { getTimebar, getTimebars } from '../../store/reducers/timebars';
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

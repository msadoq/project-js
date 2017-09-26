// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the mouse over the message
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';
import { getMessages } from '../../../store/reducers/messages';
import { getTimebar } from '../../../store/reducers/timebars';
import { remove, cancelRemove } from '../../../store/actions/messages';
import {
  updateDefaultWidth,
  updateCursors,
  jump,
  updateViewport,
} from '../../../store/actions/timebars';
import TimeSetter from './TimeSetter';

export default connect(
  (state, { timebarUuid }) => {
    const timebar = getTimebar(state, { timebarUuid });
    return {
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      timebarMode: timebar.mode,
      timebarRulerResolution: timebar.rulerResolution,
      messages: getMessages(state, { containerId: `timeSetter-${timebarUuid}` }),
    };
  }
  ,
  {
    cancelRemoveMessage: cancelRemove,
    removeMessage: remove,
    updateDefaultWidth,
    updateCursors,
    jump,
    updateViewport,
  }
)(TimeSetter);

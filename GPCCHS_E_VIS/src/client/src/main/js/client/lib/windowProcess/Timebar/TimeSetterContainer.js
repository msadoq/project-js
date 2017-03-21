import { connect } from 'react-redux';
import { getMessages } from '../../store/reducers/messages';
import { getTimebar } from '../../store/reducers/timebars';
import { remove } from '../../store/actions/messages';
import {
  updateDefaultWidth,
  updateCursors,
  jump,
  updateViewport,
} from '../../store/actions/timebars';
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
    removeMessage: remove,
    updateDefaultWidth,
    updateCursors,
    jump,
    updateViewport,
  }
)(TimeSetter);

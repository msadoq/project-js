import { connect } from 'react-redux';
import _memoize from 'lodash/memoize';
import _join from 'lodash/join';
import { getTimebarTimelinesSelector } from 'store/selectors/timebars';
import { getFocusedPage } from 'store/selectors/pages';
import TimelineField from './TimelineField';

const mapStateToProps = (state, { windowId }) => {
  console.log('TimelineFieldContainer', windowId);
  const { timebarUuid } = getFocusedPage(state, { windowId });
  const timelines = getTimebarTimelinesSelector(state, { timebarUuid });
  return {
    timelines: mapTimelines(_join(timelines.map(t => t.id)), timelines),
  };
};

const TimelineFieldContainer = connect(mapStateToProps, {})(TimelineField);

export default TimelineFieldContainer;

/**
 * @type {Function}
 */
const mapTimelines = _memoize((hash, timelines) =>
  timelines.map(t => ({ // extract ids and render new object with names
    name: t.id,
  })))
;

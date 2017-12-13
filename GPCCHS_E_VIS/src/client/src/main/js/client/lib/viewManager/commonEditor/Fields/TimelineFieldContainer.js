import { connect } from 'react-redux';
import { getTimebarTimelinesSelector } from 'store/selectors/timebars';
import { getFocusedPage } from 'store/selectors/pages';
import TimelineField from './TimelineField';

const mapStateToProps = (state, { windowId }) => {
  const { timebarUuid } = getFocusedPage(state, { windowId });
  return {
    timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
  };
};

const TimelineFieldContainer = connect(mapStateToProps, {})(TimelineField);

export default TimelineFieldContainer;

import { connect } from 'react-redux';
import TimelineField from './TimelineField';
import { getTimebarTimelinesSelector } from '../../../store/selectors/timebars';
import { getFocusedPage } from '../../../store/selectors/pages';

const mapStateToProps = (state, { windowId }) => {
  const { timebarUuid } = getFocusedPage(state, { windowId });
  return {
    timelines: getTimebarTimelinesSelector(state, { timebarUuid }),
  };
};

const TimelineFieldContainer = connect(mapStateToProps, {})(TimelineField);

export default TimelineFieldContainer;

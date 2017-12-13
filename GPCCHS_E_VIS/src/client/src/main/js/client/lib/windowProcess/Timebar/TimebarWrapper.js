// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 10/02/2017 : Timebar realtime mode disabled when user moving current and dragging.
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Removed Object.entries -> Object.keys . Removed unecessary prop.
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Timebar components : timebar.masterId is not mandatory anymore.
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : chunk pause action on open editor and on dislay timesetter
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : merge dev into abesson-html-editor and resolve conflicts
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Timebar refactoring: components more modular, less props passed.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Removed timeline.timelineUuid, already has timeline.uuid .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Styling and adding play / pause button to collapsed timebar.
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fixing css problem with formattedFullDate el. removed useless props.
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove unused parameter from timebar
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Synchro between timelines left and timebar timelines.
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : No need for Dimensions in Timebar -> RightTab, using props from panels.
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css instead of JE and react refs.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Panels are now sticky on left and right.
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import getLogger from 'common/logManager';
import styles from './TimebarWrapper.css';
import LeftTabContainer from './LeftTab/LeftTabContainer';
import RightTabContainer from './RightTabContainer';

const logger = getLogger('Timebar');

export default class TimebarWrapper extends PureComponent {

  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    timebar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      rulerResolution: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      rulerStart: PropTypes.number.isRequired,
      masterId: PropTypes.string,
      realTime: PropTypes.bool.isRequired,
      mode: PropTypes.string.isRequired,
      slideWindow: PropTypes.shape({
        lower: PropTypes.number.isRequired,
        upper: PropTypes.number.isRequired,
      }).isRequired,
      visuWindow: PropTypes.shape({
        lower: PropTypes.number.isRequired,
        upper: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        defaultWidth: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    pageId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  state = {
    timelinesVerticalScroll: 0,
  };

  onTimelinesVerticalScroll = (e) => {
    e.preventDefault();
    this.setState({
      timelinesVerticalScroll: e.target.scrollTop,
    });
  }

  render() {
    logger.debug('render');
    const {
      timelines,
      isPlaying,
      timebar,
      pageId,
      height,
      width,
    } = this.props;
    const {
      timelinesVerticalScroll,
    } = this.state;

    return (
      <div
        className={styles.container}
        style={{ height }}
      >
        <LeftTabContainer
          timebarUuid={timebar.uuid}
          pageId={pageId}
          masterId={timebar.masterId}
          timebarName={timebar.id}
          timelines={timelines}
          verticalScroll={timelinesVerticalScroll}
          onTimelinesVerticalScroll={this.onTimelinesVerticalScroll}
        />
        <div className={styles.timebarWrapper}>
          <RightTabContainer
            containerWidth={width * 0.75}
            timebar={timebar}
            isPlaying={isPlaying}
            timelines={timelines}
            onTimelinesVerticalScroll={this.onTimelinesVerticalScroll}
            timelinesVerticalScroll={timelinesVerticalScroll}
          />
        </div>
      </div>
    );
  }
}

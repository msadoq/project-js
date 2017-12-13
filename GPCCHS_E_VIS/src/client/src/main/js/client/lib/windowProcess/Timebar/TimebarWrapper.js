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

import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import getLogger from 'common/log';
import styles from './Timebar.css';
import LeftTabContainer from './LeftTabContainer';
import RightTabContainer from './RightTabContainer';
import TimeSetterContainer from './TimeSetterContainer';
import Modal from '../common/Modal';

const logger = getLogger('Timebar');
const minTimebarHeight = 140;

const inlineStyles = {
  paddingBottom8: {
    paddingBottom: 8,
  },
};

export default class TimebarWrapper extends PureComponent {

  static propTypes = {
    collapseTimebar: PropTypes.func.isRequired,
    updateTimebarHeight: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
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
    timebar: PropTypes.shape({
      extUpperBound: PropTypes.number.isRequired,
      rulerResolution: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      rulerStart: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
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
    timebarUuid: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        timelineId: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
      })
    ).isRequired,
    timebarHeight: PropTypes.number,
    timebarCollapsed: PropTypes.bool.isRequired,
    pause: PropTypes.func.isRequired,
  }

  static defaultProps = {
    timebarHeight: 140,
  }
  state = {
    timelinesVerticalScroll: 0,
    displayTimesetter: false,
    timesetterCursor: null,
    timebarHeight: minTimebarHeight,
  };

  onTimelinesVerticalScroll = (e, el) => {
    e.preventDefault();
    this.setState({
      timelinesVerticalScroll: el ? (el.scrollTop + (e.deltaY / 3)) : e.target.scrollTop,
    });
  }

  resizeWindow = (e) => {
    e.stopPropagation();
    this.setState({
      resizingWindow: true,
      cursorOriginY: e.pageY,
      heightOrigin: this.props.timebarHeight,
    });
    document.addEventListener('mousemove', this.resizeWindowMouseMove);
    document.addEventListener('mouseup', this.resizeWindowMouseUp);
  }

  resizeWindowMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.resizingWindow) {
      const movedPx = this.state.cursorOriginY - e.pageY;
      let newTimebarHeight = this.state.heightOrigin + (movedPx * 1.3);
      newTimebarHeight = newTimebarHeight < minTimebarHeight ? minTimebarHeight : newTimebarHeight;
      this.timebarHeight = newTimebarHeight;
      this.el.style.flexBasis = `${this.timebarHeight}px`;
    }
  }

  resizeWindowMouseUp = (e) => {
    e.preventDefault();
    const {
      updateTimebarHeight,
      focusedPageId,
    } = this.props;
    document.removeEventListener('mousemove', this.resizeWindowMouseMove);
    document.removeEventListener('mouseup', this.resizeWindowMouseUp);
    this.setState({ resizingWindow: false });
    updateTimebarHeight(
      focusedPageId,
      this.timebarHeight
    );
  }

  toggleTimesetter = (e) => {
    if (e) {
      e.preventDefault();
      if (e.currentTarget.tagName !== e.target.tagName) return;
    }
    this.setState({
      displayTimesetter: !this.state.displayTimesetter,
      timesetterCursor: (e && e.currentTarget) ? e.currentTarget.getAttribute('cursor') : null,
    });
    if (this.props.isPlaying) {
      this.props.pause();
    }
  }

  willCollapse = (e) => {
    e.preventDefault();
    this.props.collapseTimebar(this.props.focusedPageId, false);
  }

  assignEl = (el) => { this.el = el; }

  render() {
    logger.debug('render');
    const {
      timelines,
      timebarUuid,
      visuWindow,
      isPlaying,
      timebar,
      slideWindow,
      focusedPageId,
      timebarCollapsed,
      collapseTimebar,
      timebarHeight,
    } = this.props;
    const {
      displayTimesetter,
      timesetterCursor,
      timelinesVerticalScroll,
      resizingWindow,
    } = this.state;

    const timesetter = (
      <Modal
        title="Manual time setter"
        onClose={this.toggleTimesetter}
        isOpened={displayTimesetter}
      >
        <TimeSetterContainer
          visuWindow={visuWindow}
          onClose={this.toggleTimesetter}
          slideWindow={slideWindow}
          isPlaying={isPlaying}
          timebarUuid={timebarUuid}
          timebarRulerResolution={timebar.rulerResolution}
          timebarMode={timebar.mode}
          cursor={timesetterCursor || 'all'}
        />
      </Modal>
    );

    if (timebarCollapsed) {
      return (
        <div
          className={styles.timebarWrapperCollapsed}
        >
          <Button
            bsStyle="default"
            bsSize="sm"
            onClick={this.willCollapse}
          >
            Expand timebar
          </Button>
        </div>
      );
    }

    return (
      <div
        ref={this.assignEl}
        style={{
          flexBasis: `${timebarHeight || minTimebarHeight}px`,
          background: '#FAFAFA',
          borderTop: '1px solid #aaa',
          zIndex: '2',
          padding: '0px 5px',
        }}
      >
        {timesetter}
        <div className="col-xs-9 col-xs-offset-3" style={inlineStyles.paddingBottom8}>
          <div>
            <hr
              onMouseDown={this.resizeWindow}
              className={
                classnames(
                  styles.resizeTimebarContainer,
                  (resizingWindow ? styles.resizingTimebarContainer : null)
                )
              }
            />
          </div>
        </div>
        <LeftTabContainer
          timebarUuid={timebarUuid}
          focusedPageId={focusedPageId}
          masterId={timebar.masterId}
          timebarName={timebar.id}
          timelines={timelines}
          collapseTimebar={collapseTimebar}
          verticalScroll={timelinesVerticalScroll}
          onTimelinesVerticalScroll={this.onTimelinesVerticalScroll}
        />
        <div className={classnames('col-xs-9', styles.h100minus13)}>
          <RightTabContainer
            timebar={timebar}
            timebarUuid={timebarUuid}
            visuWindow={visuWindow}
            slideWindow={slideWindow}
            isPlaying={isPlaying}
            timelines={timelines}
            toggleTimesetter={this.toggleTimesetter}
            onTimelinesVerticalScroll={this.onTimelinesVerticalScroll}
            timelinesVerticalScroll={timelinesVerticalScroll}
          />
        </div>
      </div>
    );
  }
}

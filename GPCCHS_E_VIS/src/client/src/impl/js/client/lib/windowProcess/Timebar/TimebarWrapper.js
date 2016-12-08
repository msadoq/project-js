import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Col } from 'react-bootstrap';
import getLogger from 'common/log';
import styles from './Timebar.css';
import LefttabContainer from './LefttabContainer';
import RighttabContainer from './RighttabContainer';
import TimeSetterContainer from './TimeSetterContainer';
import Modal from '../common/Modal';

const logger = getLogger('GPCCHS:Timebar');
const minTimebarHeight = 135;

export default class TimebarWrapper extends Component {

  static propTypes = {
    updateCursors: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    updateTimebarHeight: PropTypes.func.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebar: PropTypes.object.isRequired,
    timebarId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
    currentSessionOffsetMs: PropTypes.number,
    timebarHeight: PropTypes.number,
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
      timelinesVerticalScroll: el ? (el.scrollTop + (e.deltaY / 3)) : e.target.scrollTop
    });
  }

  resizeWindow = (e) => {
    this.setState({
      resizingWindow: true,
      cursorOriginY: e.pageY,
      heightOrigin: this.el.clientHeight,
      height: this.el.clientHeight
    });

    document.addEventListener('mousemove', this.resizeWindowMouseMove);
    document.addEventListener('mouseup', this.resizeWindowMouseUp);
    e.stopPropagation();
  }

  resizeWindowMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.resizingWindow) {
      const movedPx = this.state.cursorOriginY - e.pageY;
      let newTimebarHeight = this.state.heightOrigin + movedPx;
      newTimebarHeight = newTimebarHeight < minTimebarHeight ? minTimebarHeight : newTimebarHeight;
      this.el.style.height = `${newTimebarHeight}px`;

      if (!this.updateTimebarHeightdebounce) {
        this.updateTimebarHeightdebounce = debounce(this.willUpdateTimebarHeight, 300);
      }
      this.updateTimebarHeightdebounce(newTimebarHeight);
    }
  }

  willUpdateTimebarHeight = (timebarHeight) => {
    this.props.updateTimebarHeight(
      this.props.focusedPageId,
      timebarHeight
    );
  }

  resizeWindowMouseUp = (e) => {
    document.removeEventListener('mousemove', this.resizeWindowMouseMove);
    document.removeEventListener('mouseup', this.resizeWindowMouseUp);
    this.setState({ resizingWindow: false });
    e.preventDefault();
  }

  toggleTimesetter = (e) => {
    if (e) {
      e.preventDefault();
      if (e.currentTarget.tagName !== e.target.tagName) return;
    }
    this.setState({
      displayTimesetter: !this.state.displayTimesetter,
      timesetterCursor: (e && e.currentTarget) ? e.currentTarget.getAttribute('cursor') : null
    });
  }

  render() {
    logger.debug('render');
    const {
      updateCursors,
      timelines,
      timebarId,
      visuWindow,
      isPlaying,
      timebar,
      slideWindow,
      currentSessionOffsetMs,
      focusedPageId,
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
          updateCursors={updateCursors}
          timebarId={timebarId}
          timebarMode={timebar.mode}
          cursor={timesetterCursor || 'all'}
        />
      </Modal>
    );

    return (
      <div
        ref={(el) => { this.el = el; }}
        style={{
          flex: '0 0 auto',
          height: `${timebarHeight || 135}px`,
          backgroundColor: '#F1F1F1',
          zIndex: '2',
        }}
      >
        {timesetter}
        <Col xs={12} style={{ paddingBottom: 2 }}>
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
        </Col>
        <LefttabContainer
          timebarId={timebarId}
          focusedPageId={focusedPageId}
          masterId={timebar.masterId}
          timebarName={timebar.id}
          timelines={timelines}
          verticalScroll={timelinesVerticalScroll}
          onTimelinesVerticalScroll={this.onTimelinesVerticalScroll}
        />
        <RighttabContainer
          timebar={timebar}
          timebarId={timebarId}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          currentSessionOffsetMs={currentSessionOffsetMs}
          isPlaying={isPlaying}
          timelines={timelines}
          toggleTimesetter={this.toggleTimesetter}
          onTimelinesVerticalScroll={this.onTimelinesVerticalScroll}
          timelinesVerticalScroll={timelinesVerticalScroll}
          updateCursors={updateCursors}
        />
      </div>
    );
  }
}

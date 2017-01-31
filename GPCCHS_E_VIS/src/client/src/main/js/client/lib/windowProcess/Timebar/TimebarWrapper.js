import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { debounce } from 'lodash';
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
  }
};

export default class TimebarWrapper extends PureComponent {

  static propTypes = {
    collapseTimebar: PropTypes.func.isRequired,
    updateTimebarHeight: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebar: PropTypes.object.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
    timebarHeight: PropTypes.number,
    timebarCollapsed: PropTypes.bool,
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
      timebarHeight,
      timebarCollapsed,
      collapseTimebar,
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
          flex: '0 0 auto',
          height: `${timebarHeight || minTimebarHeight}px`,
          backgroundColor: '#F1F1F1',
          borderTop: '1px solid #aaa',
          zIndex: '2',
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
        <div className="col-xs-9 h100">
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

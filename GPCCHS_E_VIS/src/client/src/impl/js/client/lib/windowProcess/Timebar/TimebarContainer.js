import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { updateVisuWindow, addAndMountTimeline, unmountTimeline } from '../../store/actions/timebars';
import styles from './Timebar.css';
import Timebar from './Timebar';
import Lefttab from './Lefttab';


class TimebarContainer extends Component {

  static propTypes = {
    updateVisuWindowAction: React.PropTypes.func.isRequired,
    addAndMountTimelineAction: React.PropTypes.func.isRequired,
    unmountTimelineAction: React.PropTypes.func.isRequired,
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timebarName: React.PropTypes.string.isRequired,
    timelines: React.PropTypes.array.isRequired,
  }

  state = {
    timelinesVerticalScroll: 0
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
      this.setState({
        height: this.state.heightOrigin + movedPx
      });
    }
  }

  resizeWindowMouseUp = (e) => {
    document.removeEventListener('mousemove', this.resizeWindowMouseMove);
    document.removeEventListener('mouseup', this.resizeWindowMouseUp);
    this.setState({ resizingWindow: false });
    e.preventDefault();
  }

  render() {
    const { timelinesVerticalScroll } = this.state;
    let { height } = this.state;
    const { updateVisuWindowAction, timelines, timebarId,
      visuWindow, focusedPage, timebarName,
      addAndMountTimelineAction, unmountTimelineAction
    } = this.props;

    let hrKlasses = styles.resizeTimebarContainer;
    if (this.state.resizingWindow) {
      hrKlasses += ` ${styles.resizingTimebarContainer}`;
    }

    let minHeight;
    if (timelines.length < 6) {
      minHeight = 180;
    } else if (timelines.length < 8) {
      minHeight = (timelines.length * 20) + 90;
    } else {
      minHeight = 230;
    }

    if (minHeight > height || !height) {
      height = minHeight;
    }

    return (
      <div
        ref={(el) => { this.el = el; }}
        style={{ flex: '0 0 auto', height: `${height}px` }}
      >
        <Col xs={12} style={{ paddingBottom: 18 }}>
          <div><hr onMouseDown={this.resizeWindow} className={hrKlasses} /></div>
        </Col>
        <Col xs={3}>
          <Lefttab
            timebarId={timebarId}
            timebarName={timebarName}
            timelines={timelines}
            addAndMountTimeline={addAndMountTimelineAction}
            unmountTimeline={unmountTimelineAction}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={this.onTimelinesVerticalScroll}
          />
        </Col>
        <div className="col-xs-9">
          <Timebar
            timebarId={timebarId}
            visuWindow={visuWindow}
            timelines={timelines}
            focusedPage={focusedPage}
            onChange={updateVisuWindowAction}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={this.onTimelinesVerticalScroll}
          />
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const { timebarId } = ownProps.focusedPage;
  const timebarName = state.timebars[timebarId].id;
  const timelines = [];
  state.timebars[timebarId].timelines.forEach((v) => {
    timelines.push(Object.assign({}, state.timelines[v], { timelineId: v }));
  });

  return {
    visuWindow: get(state, ['timebars', timebarId, 'visuWindow']),
    timebarId,
    timebarName,
    timelines
  };
}, {
  updateVisuWindowAction: updateVisuWindow,
  addAndMountTimelineAction: addAndMountTimeline,
  unmountTimelineAction: unmountTimeline
})(TimebarContainer);

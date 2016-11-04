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
    changeVisuWindow: React.PropTypes.func.isRequired,
    addAndMountTimelineAction: React.PropTypes.func.isRequired,
    unmountTimelineAction: React.PropTypes.func.isRequired,
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timebarName: React.PropTypes.string.isRequired,
    timelines: React.PropTypes.array.isRequired,
  }

  state = {
    timelinesVerticalScroll: 0,
    height: 140
  };

  resizeWindow = (e) => {
    this.setState({
      resizingWindow: true,
      cursorOriginY: e.pageY,
      heightOrigin: this.state.height
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

  onTimelinesVerticalScroll = (e) => {
    e.preventDefault();
    this.setState({ timelinesVerticalScroll: e.target.scrollTop });
  }

  render() {
    const { timelinesVerticalScroll, height } = this.state;
    const { changeVisuWindow, timelines, timebarId,
      visuWindow, focusedPage, timebarName,
      addAndMountTimelineAction, unmountTimelineAction
    } = this.props;
    let hrKlasses = styles.resizeTimebarContainer;
    if (this.state.resizingWindow) {
      hrKlasses += ` ${styles.resizingTimebarContainer}`;
    }

    return (
      <div>
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
        <Col xs={9} style={{ height: `${height}px` }}>
          <Timebar
            timebarId={timebarId}
            visuWindow={visuWindow}
            timelines={timelines}
            focusedPage={focusedPage}
            onChange={changeVisuWindow}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={this.onTimelinesVerticalScroll}
          />
        </Col>
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
  changeVisuWindow: updateVisuWindow,
  addAndMountTimelineAction: addAndMountTimeline,
  unmountTimelineAction: unmountTimeline
})(TimebarContainer);

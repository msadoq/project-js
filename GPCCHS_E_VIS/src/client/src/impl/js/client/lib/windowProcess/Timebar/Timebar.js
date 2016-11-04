import moment from 'moment';
import React, { Component } from 'react';
import styles from './Timebar.css';
import TimebarScale from './TimebarScale';
import TimebarTimeline from './TimebarTimeline';


export default class Timebar extends Component {

  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    verticalScroll: React.PropTypes.number.isRequired,
  }

  constructor(...args) {
    super(...args);

    const lower = this.props.visuWindow.lower || ((new Date().getTime()) - (1000 * 60 * 48));
    const upper = this.props.visuWindow.upper || ((new Date().getTime()) + (1000 * 60 * 48));
    const timeBeginning = lower - ((upper - lower) * 2);
    const timeEnd = upper + ((upper - lower) * 2);

    this.state = {
      mode: 'pause',
      timeBeginning,
      timeEnd
    };
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  onMouseDown = (e) => {
    if (e.target.tagName === 'SPAN') return e.stopPropagation();

    const { visuWindow } = this.props;
    this.setState({
      dragging: true,
      resizing: false,
      navigating: false,
      cursorOriginX: e.pageX,
      dragOriginLower: this.state.lower || visuWindow.lower,
      dragOriginUpper: this.state.upper || visuWindow.upper,
      dragOriginCurrent: this.state.current || visuWindow.current
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onMouseUp = (e) => {
    e.preventDefault();
    const { visuWindow } = this.props;
    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;
    const current = this.state.current || visuWindow.current;
    this.setState({
      dragging: false,
      resizing: false,
      navigating: false,
      dragNavigating: false,
      lower: null,
      upper: null,
      current: null
    });
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    return this.props.onChange(
      this.props.focusedPage.timebarId,
      {
        lower: Math.trunc(lower),
        upper: Math.trunc(upper),
        current: Math.trunc(current)
      }
    );
  }

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { visuWindow } = this.props;
    const {
      timeEnd, timeBeginning, cursorOriginX,
      dragging, resizing, dragOriginLower,
      dragOriginUpper, resizeOrigin, resizeCursor,
      navigating, dragOriginCurrent
    } = this.state;
    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;

    const viewportMsWidth = timeEnd - timeBeginning;
    if (dragging) {
      const viewportOffset = this.el.getBoundingClientRect();
      if (viewportOffset.left > e.pageX || viewportOffset.right < e.pageX) {
        const mult = e.pageX - viewportOffset.left > 0 ? 1 : -1;

        let abs;
        if (viewportOffset.left > e.pageX) {
          abs = Math.abs(e.pageX - viewportOffset.left);
        } else {
          abs = Math.abs(e.pageX - viewportOffset.right);
        }

        let pow = 2;
        if (abs > 100) {
          pow = 9;
        } else if (abs > 50) {
          pow = 6;
        } else if (abs > 30) {
          pow = 4;
        } else if (abs > 15) {
          pow = 3;
        }

        const offsetRel = (mult * 20) / Math.pow(abs / 100, pow);
        this.setState({
          dragNavigatingOffset: offsetRel,
        });
        if (!this.state.dragNavigating) {
          this.setState({
            dragNavigating: true,
          });
          return setTimeout(() => {
            this.dragNavigate();
          }, 60);
        }
      } else {
        this.setState({ dragNavigating: false });
      }

      const moved = (e.pageX - cursorOriginX) / this.el.clientWidth;
      const lowerPosMs = dragOriginLower + (viewportMsWidth * moved);
      const upperPosMs = dragOriginUpper + (viewportMsWidth * moved);
      const currentPosMs = dragOriginCurrent + (viewportMsWidth * moved);

      this.setState({
        lower: lowerPosMs,
        upper: upperPosMs,
        current: currentPosMs
      });
    } else if (resizing) {
      const movedPx = (e.pageX - cursorOriginX);
      const timebarContWidth = this.el.clientWidth;
      const movedMs = (movedPx / timebarContWidth) * viewportMsWidth;

      let cursorPosMs = resizeOrigin + movedMs;
      if (resizeCursor === 'lower') {
        if (visuWindow.current < cursorPosMs) {
          cursorPosMs = visuWindow.current;
        } else if (cursorPosMs < timeBeginning) {
          cursorPosMs = timeBeginning;
        } else if (cursorPosMs > upper) {
          cursorPosMs = upper - 2000;
        }
        this.setState({ lower: cursorPosMs });
      } else if (resizeCursor === 'upper') {
        if (visuWindow.current > cursorPosMs) {
          cursorPosMs = visuWindow.current;
        } else if (cursorPosMs > timeEnd) {
          cursorPosMs = timeEnd;
        } else if (cursorPosMs < lower) {
          cursorPosMs = upper + 2000;
        }
        this.setState({ upper: cursorPosMs });
      }
    } else if (navigating) {
      const current = this.state.current || visuWindow.current;
      const movedPx = (e.pageX - cursorOriginX);
      const viewportWidthPx = this.el.clientWidth;
      const movedMs = (movedPx / viewportWidthPx) * viewportMsWidth;
      let cursorPosMs = resizeOrigin + movedMs;

      if (cursorPosMs === current) return;

      if (cursorPosMs < visuWindow.lower) {
        cursorPosMs = visuWindow.lower;
      } else if (cursorPosMs > visuWindow.upper) {
        cursorPosMs = visuWindow.upper;
      }

      this.setState({
        current: cursorPosMs
      });
    }
  }

  onMouseDownResize = (e) => {
    const { visuWindow } = this.props;
    const cursor = e.target.getAttribute('cursor');
    this.setState({
      resizing: true,
      dragging: false,
      navigating: false,
      resizeCursor: cursor,
      cursorOriginX: e.pageX,
      resizeOrigin: this.state[cursor] || visuWindow[cursor]
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onMouseDownNavigate = (e) => {
    const { visuWindow } = this.props;
    this.setState({
      navigating: true,
      dragging: false,
      resizing: false,
      cursorOriginX: e.pageX,
      resizeOrigin: visuWindow.current
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onWheel = (e) => {
    if (!e.ctrlKey) {
      return this.props.onVerticalScroll(e, this.timelinesEl);
    }
    e.preventDefault();
    const { timeBeginning, timeEnd } = this.state;

    const viewportOffsetLeft = e.currentTarget.getBoundingClientRect().left;
    const viewportOffsetRight = e.currentTarget.getBoundingClientRect().right;
    const percentOffsetWithLeft = (viewportOffsetLeft - e.pageX) / e.currentTarget.clientWidth;
    const percentOffsetWithRight = (viewportOffsetRight - e.pageX) / e.currentTarget.clientWidth;

    const cursorMs = timeBeginning + ((timeEnd - timeBeginning) * -percentOffsetWithLeft);
    const coeff = (e.deltaY > 0 ? 0.15 : -0.15);
    const offsetLeftMs = coeff * ((cursorMs - timeBeginning) * percentOffsetWithLeft);
    const offsetRightMs = coeff * ((timeEnd - cursorMs) * percentOffsetWithRight);

    this.setState({
      timeBeginning: timeBeginning + offsetLeftMs,
      timeEnd: timeEnd + offsetRightMs,
    });
  }

  dragNavigate = () => {
    const { timeEnd, timeBeginning, dragNavigating,
      dragNavigatingOffset, cursorOriginX, lower,
      upper, current } = this.state;
    const viewportMsWidth = timeEnd - timeBeginning;

    if (dragNavigating) {
      const offsetMs = viewportMsWidth / dragNavigatingOffset;
      this.setState({
        timeBeginning: timeBeginning + offsetMs,
        timeEnd: this.state.timeEnd + offsetMs,
        cursorOriginX: cursorOriginX - (this.el.clientWidth / dragNavigatingOffset),
        lower: lower + offsetMs,
        upper: upper + offsetMs,
        current: current + offsetMs,
      });
      return setTimeout(() => {
        this.dragNavigate();
      }, 60);
    }
  }

  formatDate(ms, cursor) {
    const date = moment(ms);
    if (cursor) {
      if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 60 * 24 * 30)) {
        return date.format('YYYY[-]MM[-]DD');
      } else if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 60 * 24 * 4)) {
        return date.format('YYYY[-]MM[-]DD HH');
      } else if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 60 * 24)) {
        return date.format('MM[-]DD HH[:]mm[:]ss');
      } else if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 60 * 6)) {
        return date.format('MM[-]DD HH[:]mm[:]ss');
      } else if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 4)) {
        return date.format('HH[:]mm[:]ss');
      }
      return date.format('HH[:]mm[:]ss SSS');
    }

    if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 60 * 6)) {
      return date.format('YYYY[-]MM[-]DD HH[:]mm[:]ss');
    } else if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 4)) {
      return date.format('MM[-]DD HH[:]mm[:]ss');
    }
    return date.format('MM[-]DD HH[:]mm[:]ss SSS');
  }

  rePosition = (side) => {
    const { visuWindow } = this.props;
    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;

    if (side === 'left') {
      this.setState({
        timeBeginning: lower - ((upper - lower) / 5),
        timeEnd: upper + ((upper - lower) * 2),
      });
    } else if (side === 'right') {
      this.setState({
        timeBeginning: lower - ((upper - lower) * 2),
        timeEnd: upper + ((upper - lower) / 5),
      });
    }
  }

  calculate = () => {
    const { visuWindow } = this.props;
    const { timeBeginning, timeEnd } = this.state;
    let { lower, upper, current } = this.state;
    lower = lower || visuWindow.lower || ((new Date().getTime()) - (1000 * 60 * 48));
    upper = upper || visuWindow.upper || ((new Date().getTime()) + (1000 * 60 * 48));
    current = current || visuWindow.current || (lower + upper) / 2;

    const selectedMsWidth = upper - lower;
    const selectedPercentWidth = (100 * selectedMsWidth) / (timeEnd - timeBeginning);
    const lowerPercentOffset = (100 * (lower - timeBeginning)) / (timeEnd - timeBeginning);
    const currentPercentOffset = (100 * (current - lower)) / (upper - lower);

    return {
      selectedMsWidth,
      selectedPercentWidth,
      lowerPercentOffset,
      currentPercentOffset
    };
  }

  render() {
    const {
        dragging, resizing,
        timeBeginning, timeEnd
    } = this.state;
    const { visuWindow, timelines } = this.props;

    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;
    const current = this.state.current || visuWindow.current;

    const calc = this.calculate();

    let klasses = styles.viewport;
    if (dragging) klasses += ` ${styles.viewportDragging}`;
    if (resizing) klasses += ` ${styles.viewportResizing}`;

    let arrowRight;
    let arrowLeft;
    if (upper <= timeBeginning) {
      arrowLeft = <button className={styles.arrowLeft} onClick={this.rePosition.bind(null, 'left')} />;
    }
    if (lower >= timeEnd) {
      arrowRight = <button className={styles.arrowRight} onClick={this.rePosition.bind(null, 'right')} />;
    }

    return (
      <div className={`${styles.viewportWrapper}`} ref={(el) => { this.el = el; }}>
        <div
          className={`${styles.viewportContainer}`}
          onWheel={this.onWheel}
        >
          { arrowLeft }{ arrowRight }
          <span className={styles.timeBeginning}>{this.formatDate(timeBeginning)}</span>
          <span className={styles.timeEnd}>{this.formatDate(timeEnd)}</span>
          <div
            className={klasses}
            style={{
              left: `${calc.lowerPercentOffset}%`,
              width: `${calc.selectedPercentWidth}%`
            }}
            onMouseDown={this.onMouseDown}
          >
            <span cursor="lower" className={styles.lower} onMouseDown={this.onMouseDownResize} />
            <span
              className={styles.current}
              onMouseDown={this.onMouseDownNavigate}
              style={{ left: `${calc.currentPercentOffset}%` }}
            />
            <span cursor="upper" className={styles.upper} onMouseDown={this.onMouseDownResize} />
            <span className={styles.lowerFormattedTime}>{this.formatDate(lower, true)}</span>
            <span className={styles.currentFormattedTime} style={{ left: `${calc.currentPercentOffset}%` }}>
              {this.formatDate(current, true)}
            </span>
            <span className={styles.upperFormattedTime}>{this.formatDate(upper, true)}</span>
          </div>
          <div
            ref={(el) => { this.timelinesEl = el; }}
            className={styles.timelines}
            onScroll={this.props.onVerticalScroll}
          >
            { timelines.map((v, i) =>
              <TimebarTimeline
                key={i}
                name={v.id}
                color={v.color}
                offset={v.offset}
              />
            )}
          </div>
        </div>
        <TimebarScale timeBeginning={this.state.timeBeginning} timeEnd={this.state.timeEnd} />
      </div>
    );
  }
}

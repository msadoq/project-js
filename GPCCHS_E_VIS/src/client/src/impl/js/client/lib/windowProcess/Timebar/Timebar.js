import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Timebar.css';
import TimebarScale from './TimebarScale';


export default class Timebar extends Component {

  static propTypes = {
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
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
      const viewportOffset = findDOMNode(this).getBoundingClientRect();
      if (viewportOffset.left > e.pageX || viewportOffset.right < e.pageX) {
        const mult = e.pageX - viewportOffset.left > 0 ? 1 : -1;
        let offsetRel;
        if (viewportOffset.left > e.pageX) {
          offsetRel = (mult * 20) / Math.log10(Math.abs(e.pageX - viewportOffset.left));
        } else {
          offsetRel = (mult * 20) / Math.log10(Math.abs(e.pageX - viewportOffset.right));
        }
        const offsetMs = viewportMsWidth / offsetRel;
        this.setState({
          timeBeginning: this.state.timeBeginning + offsetMs,
          timeEnd: this.state.timeEnd + offsetMs,
          cursorOriginX: this.state.cursorOriginX - (findDOMNode(this).clientWidth / offsetRel)
        });
      }

      const moved = (e.pageX - cursorOriginX) / findDOMNode(this).clientWidth;
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
      const timebarContWidth = findDOMNode(this).clientWidth;
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
      const viewportWidthPx = findDOMNode(this).clientWidth;
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

  formatDate(ms, cursor) {
    const date = new Date(ms);
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    let dateFormatted = `${d}/${m}/${y}`;

    if ((this.state.timeEnd - this.state.timeBeginning) < (1000 * 60 * 96)) {
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      if (cursor) {
        dateFormatted = `${h}h${min}`;
      } else {
        dateFormatted += ` ${h}h${min}`;
      }
    }

    if ((this.state.timeEnd - this.state.timeBeginning) < (1000 * 60 * 6)) {
      const s = date.getSeconds().toString().padStart(2, '0');
      const mil = date.getMilliseconds().toString().padStart(2, '0');
      dateFormatted += ` ${s}s ${mil}ms`;
    }

    return dateFormatted;
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
    const { visuWindow } = this.props;

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
      arrowLeft = React.createElement(
        'span',
        {
          className: styles.arrowLeft,
          onClick: this.rePosition.bind(null, 'left')
        }
      );
    }
    if (lower >= timeEnd) {
      arrowRight = React.createElement(
        'span',
        {
          className: styles.arrowRight,
          onClick: this.rePosition.bind(null, 'right')
        }
      );
    }
    return (
      <div className={`${styles.viewportWrapper}`}>
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
        </div>
        <TimebarScale timeBeginning={this.state.timeBeginning} timeEnd={this.state.timeEnd} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Timebar.css';


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
      dragOriginUpper: this.state.upper || visuWindow.upper
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
    this.setState({ lower: null, upper: null });
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    return this.props.onChange(
      this.props.focusedPage.timebarId,
      {
        lower,
        upper,
        current: visuWindow.current
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
      navigating
    } = this.state;
    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;

    const viewportMsWidth = timeEnd - timeBeginning;
    if (dragging) {
      const moved = (e.pageX - cursorOriginX) / findDOMNode(this).clientWidth;
      const lowerPosMs = dragOriginLower + (viewportMsWidth * moved);
      const upperPosMs = dragOriginUpper + (viewportMsWidth * moved);

      this.setState({
        lower: lowerPosMs,
        upper: upperPosMs
      });

      // Change the value of current only if it's in the selected area
      if (!(visuWindow.current >= lowerPosMs && visuWindow.current <= upperPosMs)) {
        this.props.onChange(
          this.props.focusedPage.timebarId,
          {
            lower: lowerPosMs,
            upper: upperPosMs,
            current: (visuWindow.current < lowerPosMs ? lowerPosMs : upperPosMs)
          }
        );
      }
    } else if (resizing) {
      const movedPx = (e.pageX - cursorOriginX);
      const timebarContWidth = findDOMNode(this).clientWidth;
      const movedMs = (movedPx / timebarContWidth) * viewportMsWidth;

      let cursorPosMs = resizeOrigin + movedMs;
      if (resizeCursor === 'lower') {
        if (cursorPosMs < timeBeginning) {
          cursorPosMs = timeBeginning;
        } else if (cursorPosMs > upper) {
          cursorPosMs = upper - 2000;
        }
        // If current is out of the selected zone, send current to store
        if (visuWindow.current < cursorPosMs) {
          this.setState({ lower: cursorPosMs });
          this.props.onChange(
            this.props.focusedPage.timebarId,
            {
              lower: cursorPosMs,
              upper,
              current: cursorPosMs
            }
          );
        } else {
          this.setState({ lower: cursorPosMs });
        }
      } else if (resizeCursor === 'upper') {
        if (cursorPosMs > timeEnd) {
          cursorPosMs = timeEnd;
        } else if (cursorPosMs < lower) {
          cursorPosMs = upper + 2000;
        }

        // If current is out of the selected zone, send current to store
        if (visuWindow.current > cursorPosMs) {
          this.setState({ upper: cursorPosMs });
          this.props.onChange(
            this.props.focusedPage.timebarId,
            {
              lower,
              upper: cursorPosMs,
              current: cursorPosMs
            }
          );
        } else {
          this.setState({ upper: cursorPosMs });
        }
      }
    } else if (navigating) {
      const movedPx = (e.pageX - cursorOriginX);
      const timebarContWidth = findDOMNode(this).clientWidth;
      const movedMs = (movedPx / timebarContWidth) * viewportMsWidth;

      const cursorPosMs = resizeOrigin + movedMs;

      if (cursorPosMs === visuWindow.current) return;

      let selectedMovedMs = 0;
      if (cursorPosMs < visuWindow.lower) {
        selectedMovedMs = cursorPosMs - visuWindow.lower;
      } else if (cursorPosMs > visuWindow.upper) {
        selectedMovedMs = cursorPosMs - visuWindow.upper;
      }

      const newLower = visuWindow.lower + selectedMovedMs;
      const newUpper = visuWindow.upper + selectedMovedMs;
      this.props.onChange(
        this.props.focusedPage.timebarId,
        {
          lower: newLower,
          upper: newUpper,
          current: cursorPosMs
        }
      );
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
    let { lower, upper } = this.state;
    lower = lower || visuWindow.lower || ((new Date().getTime()) - (1000 * 60 * 48));
    upper = upper || visuWindow.upper || ((new Date().getTime()) + (1000 * 60 * 48));
    const current = visuWindow.current || (lower + upper) / 2;

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
            <span className={styles.upperFormattedTime}>{this.formatDate(upper, true)}</span>
          </div>
        </div>
      </div>
    );
  }
}

import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import styles from './Timebar.css';


class Timebar extends Component {
  constructor(...args) {
    super(...args);

    const { visuWindow } = this.props;
    const nowMs = new Date().getTime;
    const lower = visuWindow.lower ? visuWindow.lower : (nowMs - (1000 * 60 * 48));
    const upper = visuWindow.upper ? visuWindow.upper : (nowMs + (1000 * 60 * 48));
    const timeBeginning = lower - ((upper - lower) * 2);
    const timeEnd = upper + ((upper - lower) * 2);

    this.state = {
      mode: 'pause',
      timeBeginning,
      timeEnd,
      lower,
      upper,
    };
  }

  componentDidUpdate() {
    if (!this.state.dragging && !this.state.resizing) this.removeListenners();
  }
  toggleMode() {
    if (this.state.mode === 'pause') {
      this.interval = setInterval(() => this.updateVisuWindow(250), 250);
      this.setState({ mode: 'play' });
    } else {
      clearInterval(this.interval);
      this.setState({ mode: 'pause' });
    }
  }
  formatDate(ms, cursor){
    const date = new Date(ms);
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    let dateFormatted = `${d}/${m}/${y}`;

    if ((this.state.timeEnd - this.state.timeBeginning) < (1000 * 60 * 96)) {
      const h = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      if (cursor)
        dateFormatted = `${h}h${min}`;
      else
        dateFormatted += ` ${h}h${min}`;
    }

    if ((this.state.timeEnd - this.state.timeBeginning) < (1000 * 60 * 6)) {
      const s = date.getSeconds().toString().padStart(2, '0');
      const mil = date.getMilliseconds().toString().padStart(2, '0');
      dateFormatted += ` ${s}s ${mil}ms`;
    }

    return dateFormatted;
  }
  onMouseDown = (e) => {
    if (e.target.tagName === 'SPAN') return e.stopPropagation();
    this.setState({
      dragging: true,
      resizing: false,
      cursorOriginX: e.pageX,
      dragOriginUpper: this.state.upper,
      dragOriginLower: this.state.lower,
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  removeListenners(){
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (e) => {
    e.preventDefault();
    const { lower, upper } = this.state;
    this.removeListenners();
    this.setState({ dragging: false, resizing: false });
    return this.props.onDispatch(
      lower,
      upper,
      ((upper - lower) / 2)
    );
  }

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {
        timeEnd, timeBeginning, cursorOriginX,
        dragging, resizing, dragOriginLower,
        dragOriginUpper, resizeOrigin, resizeCursor,
        lower, upper
     } = this.state;
    const { state } = this;
    const viewportMsWidth = timeEnd - timeBeginning;
    if (dragging) {
      const moved = (e.pageX - cursorOriginX) / findDOMNode(this).clientWidth;
      const lowerPosMs = dragOriginLower + (viewportMsWidth * moved);
      const upperPosMs = dragOriginUpper + (viewportMsWidth * moved);

      this.setState({
        lower: lowerPosMs,
        upper: upperPosMs
      });
    } else if (resizing) {
      const movedPx = (e.pageX - cursorOriginX);
      const timebarContWidth = findDOMNode(this).clientWidth;
      const movedMs = (movedPx / timebarContWidth) * viewportMsWidth;

      let cursorPosMs = resizeOrigin + movedMs;
      if (resizeCursor === 'lower') {
          // stoppé à gauche
        if (cursorPosMs < timeBeginning) {
          cursorPosMs = timeBeginning;
        } else if (cursorPosMs > upper) {
          cursorPosMs = upper - 2000; // TODO A determiner
        }
        this.setState({ lower: cursorPosMs });
      } else if (resizeCursor === 'upper') {
        // stoppé à droite
        if (cursorPosMs > timeEnd) {
          cursorPosMs = timeEnd;
        } else if (cursorPosMs < lower) {
          cursorPosMs = upper + 2000; // TODO A determiner
        }
        this.setState({ upper: cursorPosMs });
      }
    }
  }

  onMouseDownResize = (e) => {
    const cursor = e.target.getAttribute('cursor');
    this.setState({
      dragging: false,
      resizing: true,
      resizeCursor: cursor,
      cursorOriginX: e.pageX,
      resizeOrigin: this.state[cursor]
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
  ProtoTypes: {
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow:  React.PropTypes.object.isRequired,
    dispatch:    React.PropTypes.func.isRequired,
  }

  rePosition = (side) => {
    const { lower, upper } = this.state;
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
    const { timeBeginning, timeEnd, lower, upper } = this.state;
    const selectedMsWidth = upper - lower;
    const selectedPercentWidth = (100 * selectedMsWidth) / (timeEnd - timeBeginning);
    const leftSelectedPercentOffset = (100 * (lower - timeBeginning)) / (timeEnd - timeBeginning);
    return {
      selectedMsWidth,
      selectedPercentWidth,
      leftSelectedPercentOffset
    };
  }

  render() {
    const {
        dragging, resizing, lower,
        upper, timeBeginning, timeEnd
    } = this.state;

    const calc = this.calculate();

    let klasses = styles.viewport;
    if (dragging) klasses += ` ${styles.viewportDragging}`;
    if (resizing) klasses += ` ${styles.viewportResizing}`;

    let arrowRight, arrowLeft;
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
              left: `${calc.leftSelectedPercentOffset}%`,
              width: `${calc.selectedPercentWidth}%`
            }}
            onMouseDown={this.onMouseDown}
          >
            <span cursor="lower" className={`cursor-lower ${styles.lower}`} onMouseDown={this.onMouseDownResize} />
            <span cursor="upper" className={`cursor-upper ${styles.upper}`} onMouseDown={this.onMouseDownResize} />
            <span className={styles.lowerFormattedTime}>{this.formatDate(lower, true)}</span>
            <span className={styles.upperFormattedTime}>{this.formatDate(upper, true)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const { timebarId } = ownProps.focusedPage;
  return {
    visuWindow: get(state, ['timebars', timebarId, 'visuWindow']),
  };
})(Timebar);

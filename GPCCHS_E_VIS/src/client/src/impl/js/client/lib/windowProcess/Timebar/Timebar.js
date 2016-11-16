import moment from 'moment';
import { debounce } from 'lodash';
import classnames from 'classnames';
import React, { Component } from 'react';
import styles from './Timebar.css';
import TimebarScale from './TimebarScale';
import TimebarTimeline from './TimebarTimeline';


export default class Timebar extends Component {

  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    displayTimesetter: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    verticalScroll: React.PropTypes.number.isRequired,
  }

  state = {
    mode: 'pause'
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  onMouseDown = (e) => {
    if (e.target.tagName === 'SPAN') return e.stopPropagation();

    const { visuWindow, slideWindow } = this.props;
    this.setState({
      dragging: true,
      resizing: false,
      navigating: false,
      cursorOriginX: e.pageX,
      dragOriginLower: this.state.lower || visuWindow.lower,
      dragOriginUpper: this.state.upper || visuWindow.upper,
      dragOriginCurrent: this.state.current || visuWindow.current,
      slideLower: slideWindow.lower,
      slideUpper: slideWindow.upper
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onMouseUp = (e) => {
    e.preventDefault();
    const { visuWindow, slideWindow, onChange, timebarId } = this.props;

    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;
    const current = this.state.current || visuWindow.current;
    const slideLower = this.state.slideLower || slideWindow.lower;
    const slideUpper = this.state.slideUpper || slideWindow.upper;

    this.setState({
      dragging: false,
      resizing: false,
      navigating: false,
      dragNavigating: false,
      lower: null,
      upper: null,
      current: null,
      slideLower: null,
      slideUpper: null
    });
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    return onChange(
      timebarId,
      {
        lower: Math.trunc(lower),
        upper: Math.trunc(upper),
        current: Math.trunc(current),
        slideWindow: {
          lower: slideLower,
          upper: slideUpper,
        }
      }
    );
  }

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { visuWindow, slideWindow } = this.props;
    const {
      cursorOriginX, dragging, resizing, dragOriginLower,
      dragOriginUpper, resizeOrigin, resizeCursor,
      navigating, dragOriginCurrent
    } = this.state;
    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;
    const slideLower = this.state.slideLower || slideWindow.lower;
    const slideUpper = this.state.slideUpper || slideWindow.upper;

    const viewportMsWidth = slideUpper - slideLower;
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
        if (abs > 80) {
          pow = 9;
        } else if (abs > 55) {
          pow = 7;
        } else if (abs > 45) {
          pow = 6;
        } else if (abs > 35) {
          pow = 5;
        } else if (abs > 25) {
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
          setTimeout(this.dragNavigate, 60);
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
        } else if (cursorPosMs < slideLower) {
          cursorPosMs = slideLower;
        } else if (cursorPosMs > upper) {
          cursorPosMs = upper - 2000;
        }
        this.setState({ lower: cursorPosMs });
      } else if (resizeCursor === 'upper') {
        if (visuWindow.current > cursorPosMs) {
          cursorPosMs = visuWindow.current;
        } else if (cursorPosMs > slideUpper) {
          cursorPosMs = slideUpper;
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
    const { visuWindow, slideWindow } = this.props;
    this.setState({
      navigating: true,
      dragging: false,
      resizing: false,
      cursorOriginX: e.pageX,
      resizeOrigin: visuWindow.current,
      slideLower: slideWindow.lower,
      slideUpper: slideWindow.upper
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onWheel = (e) => {
    e.preventDefault();

    const { slideWindow, visuWindow } = this.props;
    const slideLower = this.state.slideLower || slideWindow.lower;
    const slideUpper = this.state.slideUpper || slideWindow.upper;

    if (e.ctrlKey) {
      let { lower, upper, current } = this.state;
      lower = lower || visuWindow.lower;
      upper = upper || visuWindow.upper;
      current = current || visuWindow.current;
      const viewportOffsetLeft = e.currentTarget.getBoundingClientRect().left;
      const percentOffsetWithLeft = (viewportOffsetLeft - e.pageX) / e.currentTarget.clientWidth;
      const cursorMs = slideLower + ((slideUpper - slideLower) * -percentOffsetWithLeft);
      const coeff = e.deltaY > 0 ? -1 : 1;

      lower += coeff * ((cursorMs - lower) / 5);
      upper += coeff * ((cursorMs - upper) / 5);
      current += coeff * ((cursorMs - current) / 5);
      lower = Math.trunc(lower);
      upper = Math.trunc(upper);
      current = Math.trunc(current);
      this.setState({ lower, upper, current });
      if (!this.debounced1) {
        this.debounced1 = debounce(this.autoUpdateVisuWindow, 300);
      }
      this.debounced1();
    } else {
      const viewportOffsetLeft = e.currentTarget.getBoundingClientRect().left;
      const viewportOffsetRight = e.currentTarget.getBoundingClientRect().right;
      const percentOffsetWithLeft = (viewportOffsetLeft - e.pageX) / e.currentTarget.clientWidth;
      const percentOffsetWithRight = (viewportOffsetRight - e.pageX) / e.currentTarget.clientWidth;

      const coeff = (e.deltaY > 0 ? 0.15 : -0.15);
      const offsetLeftMs = coeff * ((slideUpper - slideLower) * percentOffsetWithLeft);
      const offsetRightMs = coeff * ((slideUpper - slideLower) * percentOffsetWithRight);

      const newSlideLower = Math.trunc(slideLower + offsetLeftMs);
      const newSlideUpper = Math.trunc(slideUpper + offsetRightMs);

      this.setState({
        slideLower: newSlideLower,
        slideUpper: newSlideUpper
      });
      if (!this.debounced2) {
        this.debounced2 = debounce(this.autoUpdateSlideWindow, 300);
      }
      this.debounced2();
    }
  }

  onTimescaleNavigate = (slideLower, slideUpper, save) => {
    if (save) {
      const { timebarId, onChange } = this.props;
      this.setState({
        slideLower: null,
        slideUpper: null
      });
      onChange(
        timebarId,
        {
          slideWindow: {
            lower: slideLower,
            upper: slideUpper
          }
        }
      );
    } else {
      this.setState({ slideLower, slideUpper });
    }
  }

  autoUpdateSlideWindow = () => {
    const { timebarId, onChange } = this.props;
    const { slideLower, slideUpper } = this.state;
    onChange(
      timebarId,
      {
        slideWindow: {
          lower: slideLower,
          upper: slideUpper
        }
      }
    );
    this.setState({ slideLower: null, slideUpper: null });
  }

  autoUpdateVisuWindow = () => {
    const { timebarId, onChange } = this.props;
    const { lower, upper, current } = this.state;
    onChange(
      timebarId,
      { lower, upper, current }
    );
    this.setState({ lower: null, upper: null, current: null });
  }

  updateCursorTime = (e) => {
    e.stopPropagation();
    const { slideWindow } = this.props;
    const { lower, upper } = slideWindow;
    const offsetPx = e.pageX - this.el.getBoundingClientRect().left;
    const cursorMs = lower + ((upper - lower) * (offsetPx / this.el.offsetWidth));
    this.setState({
      formatedFullDate: moment(cursorMs).format('D MMMM YYYY HH[:]mm[:]ss[.]SSS')
    });
  }

  dragNavigate = () => {
    const { slideLower, slideUpper, dragNavigating,
      dragNavigatingOffset, cursorOriginX, lower,
      upper, current } = this.state;
    const viewportMsWidth = slideUpper - slideLower;

    if (dragNavigating) {
      const offsetMs = viewportMsWidth / dragNavigatingOffset;
      this.setState({
        slideLower: slideLower + offsetMs,
        slideUpper: slideUpper + offsetMs,
        cursorOriginX: cursorOriginX - (this.el.clientWidth / dragNavigatingOffset),
        lower: lower + offsetMs,
        upper: upper + offsetMs,
        current: current + offsetMs,
      });
      setTimeout(this.dragNavigate, 60);
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
      return date.format('HH[:]mm[:]ss.SSS');
    }

    if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 60 * 6)) {
      return date.format('YYYY[-]MM[-]DD HH[:]mm[:]ss');
    } else if ((this.state.timeEnd - this.state.timeBeginning) > (1000 * 60 * 4)) {
      return date.format('MM[-]DD HH[:]mm[:]ss');
    }
    return date.format('MM[-]DD HH[:]mm[:]ss.SSS');
  }

  rePosition = (side) => {
    const { visuWindow, onChange, timebarId } = this.props;
    const lower = this.state.lower || visuWindow.lower;
    const upper = this.state.upper || visuWindow.upper;

    let newSlideLower;
    let newSlideUpper;
    if (side === 'left') {
      newSlideLower = lower - ((upper - lower) / 5);
      newSlideUpper = upper + ((upper - lower) * 2);
    } else if (side === 'right') {
      newSlideLower = lower - ((upper - lower) * 2);
      newSlideUpper = upper + ((upper - lower) / 5);
    }
    onChange(
      timebarId,
      {
        slideWindow: {
          lower: newSlideLower,
          upper: newSlideUpper,
        }
      }
    );
    this.setState({
      slideLower: null,
      slideUpper: null,
    });
  }

  bringCursors = (e) => {
    e.preventDefault();
    const { visuWindow, slideWindow, onChange, timebarId } = this.props;
    const newLower = slideWindow.lower + ((visuWindow.upper - visuWindow.lower) / 2);
    const newUpper = slideWindow.upper - ((visuWindow.upper - visuWindow.lower) / 2);
    const newCurrent = (newLower + newUpper) / 2;
    onChange(
      timebarId,
      {
        lower: newLower,
        upper: newUpper,
        current: newCurrent,
      }
    );
  }

  calculate = () => {
    const { visuWindow, slideWindow } = this.props;

    let { lower, upper, current } = this.state;
    lower = lower || visuWindow.lower || ((new Date().getTime()) - (1000 * 60 * 48));
    upper = upper || visuWindow.upper || ((new Date().getTime()) + (1000 * 60 * 48));
    current = current || visuWindow.current || (lower + upper) / 2;

    let { slideLower, slideUpper } = this.state;
    slideLower = slideLower || slideWindow.lower || lower - ((upper - lower) * 2);
    slideUpper = slideUpper || slideWindow.upper || upper + ((upper - lower) * 2);

    const selectedMsWidth = upper - lower;
    const selectedPercentWidth = (100 * selectedMsWidth) / (slideUpper - slideLower);
    const lowerPercentOffset = (100 * (lower - slideLower)) / (slideUpper - slideLower);
    const currentPercentOffset = (100 * (current - lower)) / (upper - lower);

    return {
      selectedMsWidth,
      selectedPercentWidth,
      lowerPercentOffset,
      currentPercentOffset
    };
  }

  render() {
    const { visuWindow, slideWindow, timelines, displayTimesetter } = this.props;
    const {
        dragging, resizing, formatedFullDate
    } = this.state;
    const { state } = this;

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const current = state.current || visuWindow.current;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;

    const calc = this.calculate();

    let arrowRight;
    let arrowLeft;
    if (upper <= slideLower) {
      arrowLeft = (
        <div>
          <button title="Navigate to current cursor" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowLeft)} onClick={this.rePosition.bind(null, 'left')} />
          <button title="Bring cursors in the viewport" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowLeft, styles.arrowLeftBring)} onClick={this.bringCursors} />
        </div>
      );
    }
    if (lower >= slideUpper) {
      arrowRight = (
        <div>
          <button title="Navigate to current cursor" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowRight)} onClick={this.rePosition.bind(null, 'right')} />
          <button title="Bring cursors in the viewport" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowRight, styles.arrowRightBring)} onClick={this.bringCursors} />
        </div>
      );
    }

    return (
      <div
        className={styles.viewportWrapper}
        ref={(el) => { this.el = el; }}
        onMouseMove={this.updateCursorTime}
      >
        {formatedFullDate ? <span className={styles.formatedFullDate}>{formatedFullDate}</span> : ''}
        <div
          className={styles.viewportContainer}
          onWheel={this.onWheel}
          onDoubleClick={displayTimesetter}
        >
          { arrowLeft }{ arrowRight }
          <span className={styles.slideLower}>{this.formatDate(slideLower)}</span>
          <span className={styles.slideUpper}>{this.formatDate(slideUpper)}</span>
          <div
            className={
              classnames(
                styles.viewport,
                (dragging ? styles.viewportDragging : null),
                (resizing ? styles.viewportResizing : null)
              )
            }
            style={{
              left: `${calc.lowerPercentOffset}%`,
              width: `${calc.selectedPercentWidth}%`
            }}
            onMouseDown={this.onMouseDown}
          >
            <span
              cursor="lower"
              className={styles.lower}
              onMouseDown={this.onMouseDownResize}
              onDoubleClick={displayTimesetter}
            />
            <span
              cursor="current"
              className={styles.current}
              onMouseDown={this.onMouseDownNavigate}
              style={{ left: `${calc.currentPercentOffset}%` }}
              onDoubleClick={displayTimesetter}
            />
            <span
              cursor="upper"
              className={styles.upper}
              onMouseDown={this.onMouseDownResize}
              onDoubleClick={displayTimesetter}
            />
            <span className={styles.lowerFormattedTime}>{this.formatDate(lower, true)}</span>
            <span
              className={styles.currentFormattedTime}
              style={{ left: `${calc.currentPercentOffset}%` }}
            >
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
        <TimebarScale
          slideLower={slideLower}
          slideUpper={slideUpper}
          onChange={this.onTimescaleNavigate}
        />
      </div>
    );
  }
}

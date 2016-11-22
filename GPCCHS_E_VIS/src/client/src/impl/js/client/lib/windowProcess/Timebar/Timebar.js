import moment from 'moment';
import { debounce } from 'lodash';
import classnames from 'classnames';
import React, { Component } from 'react';
import styles from './Timebar.css';
import TimebarScale from './TimebarScale';
import TimebarTimeline from './TimebarTimeline';

// 1980-01-01
const minViewportLower = 315532800000;
// 2040-01-01
const maxViewportUpper = 2208988800000;

export default class Timebar extends Component {

  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
    viewport: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    displayTimesetter: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    toggleTimebarDidMount: React.PropTypes.func.isRequired,
    updatePlayingState: React.PropTypes.func.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    verticalScroll: React.PropTypes.number.isRequired,
    timebarMode: React.PropTypes.string.isRequired,
    playingState: React.PropTypes.string.isRequired,
  }

  state = {}

  componentDidMount() {
    document.addEventListener('keydown', this.onShortcut);
    this.props.toggleTimebarDidMount();
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onShortcut);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onShortcut = (e) => {
    e.stopPropagation();
    if (this.el.parentElement.querySelector(':hover')) {
      const { visuWindow, timebarId, onChange, timebarMode,
        updatePlayingState, playingState, slideWindow } = this.props;
      const { lower, upper, current } = visuWindow;
      const { cursorMs } = this.state;
      const keys = { x: 88, c: 67, v: 86, b: 66, n: 78, space: 32 };
      switch (e.keyCode) {
        case keys.x:
          if (cursorMs > current) return;
          if (timebarMode === 'Fixed' && cursorMs > slideWindow.lower) return;
          onChange(timebarId, { ...visuWindow, lower: cursorMs });
          break;
        case keys.c:
          if (timebarMode === 'Normal') return;
          if (timebarMode === 'Extensible') return;
          if (timebarMode === 'Fixed' && (cursorMs < lower || cursorMs > current)) return;
          onChange(
            timebarId,
            {
              slideWindow: {
                lower: cursorMs,
                upper: slideWindow.upper,
              }
            }
          );
          break;
        case keys.v:
          if (cursorMs < lower || cursorMs > upper) return;
          if (timebarMode === 'Fixed' && cursorMs < slideWindow.lower) return;
          if (timebarMode === 'Fixed' && cursorMs > slideWindow.upper) return;
          onChange(timebarId, { ...visuWindow, current: cursorMs });
          break;
        case keys.b:
          if (timebarMode === 'Normal') return;
          if (timebarMode === 'Extensible' && cursorMs < upper) return;
          if (timebarMode === 'Fixed' && (cursorMs < current || cursorMs > upper)) return;
          onChange(
            timebarId,
            {
              slideWindow: {
                lower: slideWindow.lower,
                upper: cursorMs,
              }
            }
          );
          break;
        case keys.n:
          if (cursorMs < current) return;
          if (timebarMode === 'Extensible' && cursorMs > slideWindow.upper) return;
          if (timebarMode === 'Fixed' && cursorMs < slideWindow.upper) return;
          onChange(timebarId, { ...visuWindow, upper: cursorMs });
          break;
        case keys.space:
          updatePlayingState(timebarId, playingState === 'play' ? 'pause' : 'play');
          break;
        default:
          break;
      }
    }
  }

  onMouseDown = (e) => {
    if (e.target.tagName === 'SPAN') return e.stopPropagation();

    const { visuWindow, slideWindow, viewport } = this.props;
    const { state } = this;
    this.setState({
      dragging: true,
      resizing: false,
      navigating: false,
      cursorOriginX: e.pageX,
      dragOriginLower: state.lower || visuWindow.lower,
      dragOriginUpper: state.upper || visuWindow.upper,
      dragOriginCurrent: state.current || visuWindow.current,
      dragOriginSlideLower: state.slideLower || slideWindow.lower,
      dragOriginSlideUpper: state.slideUpper || slideWindow.upper,
      viewportLower: viewport.lower,
      viewportUpper: viewport.upper,
      slideLower: slideWindow.upper
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onMouseUp = (e) => {
    e.preventDefault();
    const { slideWindow, visuWindow, viewport, onChange, timebarId } = this.props;
    const { state } = this;

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;
    const current = state.current || visuWindow.current;
    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;

    this.setState({
      dragging: false,
      resizing: false,
      navigating: false,
      dragNavigating: false,
      lower: null,
      upper: null,
      current: null,
      viewportLower: null,
      viewportUpper: null,
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
        viewport: {
          lower: viewportLower,
          upper: viewportUpper,
        },
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
    const { visuWindow, viewport, timebarMode, slideWindow } = this.props;
    const { state } = this;
    const {
      cursorOriginX, dragging, resizing, dragOriginLower, dragNavigating,
      dragOriginUpper, resizeOrigin, resizeCursor, dragOriginSlideLower,
      navigating, dragOriginCurrent, dragOriginSlideUpper
    } = state;
    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const current = state.current || visuWindow.current;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;
    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;

    const viewportMsWidth = viewportUpper - viewportLower;
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
        if (!dragNavigating) {
          this.setState({
            dragNavigating: true,
          });
          setTimeout(this.dragNavigate, 60);
        }
      } else {
        this.setState({ dragNavigating: false });
      }

      const movedPercent = (e.pageX - cursorOriginX) / this.el.clientWidth;
      const movedMs = viewportMsWidth * movedPercent;
      const lowerPosMs = dragOriginLower + movedMs;
      const upperPosMs = dragOriginUpper + movedMs;
      const currentPosMs = dragOriginCurrent + movedMs;
      const slideLowerPosMs = dragOriginSlideLower + movedMs;
      const slideUpperPosMs = dragOriginSlideUpper + movedMs;

      this.setState({
        lower: lowerPosMs,
        upper: upperPosMs,
        current: currentPosMs,
        slideLower: slideLowerPosMs,
        slideUpper: slideUpperPosMs,
      });
    } else if (resizing) {
      const movedPx = (e.pageX - cursorOriginX);
      const timebarContWidth = this.el.clientWidth;
      const movedMs = (movedPx / timebarContWidth) * viewportMsWidth;
      let cursorPosMs = resizeOrigin + movedMs;

      if (resizeCursor === 'lower') {
        let newSlideLower = slideLower;
        if (cursorPosMs > newSlideLower) newSlideLower = cursorPosMs;
        if (cursorPosMs > current) cursorPosMs = current;
        if (cursorPosMs < viewportLower) cursorPosMs = viewportLower;
        if (cursorPosMs > upper) cursorPosMs = upper - 2000;
        this.setState({
          lower: cursorPosMs,
          slideLower: newSlideLower
        });
      } else if (resizeCursor === 'upper') {
        let newSlideUpper = slideUpper;
        if (timebarMode === 'Extensible' && cursorPosMs > newSlideUpper) newSlideUpper = cursorPosMs;
        if (timebarMode === 'Fixed' && cursorPosMs < newSlideUpper) newSlideUpper = cursorPosMs;
        if (cursorPosMs < current) cursorPosMs = current;
        if (cursorPosMs > viewportUpper) cursorPosMs = viewportUpper;
        if (cursorPosMs < lower) cursorPosMs = upper + 2000;
        this.setState({
          upper: cursorPosMs,
          slideUpper: newSlideUpper,
        });
      } else if (resizeCursor === 'slideLower') {
        if (cursorPosMs < lower) cursorPosMs = lower;
        if (cursorPosMs > current) cursorPosMs = current;
        this.setState({ slideLower: cursorPosMs });
      } else if (resizeCursor === 'slideUpper') {
        if (timebarMode === 'Extensible' && cursorPosMs < upper) cursorPosMs = upper;
        if (timebarMode === 'Fixed' && cursorPosMs > upper) cursorPosMs = upper;
        if (cursorPosMs < current) cursorPosMs = current;
        this.setState({ slideUpper: cursorPosMs });
      }
    } else if (navigating) {
      const movedPx = (e.pageX - cursorOriginX);
      const viewportWidthPx = this.el.clientWidth;
      const movedMs = (movedPx / viewportWidthPx) * viewportMsWidth;
      let cursorPosMs = resizeOrigin + movedMs;
      let newSlideLower = slideLower;
      let newSlideUpper = slideUpper;

      if (cursorPosMs === current) return;

      if (cursorPosMs < visuWindow.lower) {
        cursorPosMs = visuWindow.lower;
      } else if (cursorPosMs > visuWindow.upper) {
        cursorPosMs = visuWindow.upper;
      }
      if (cursorPosMs < slideLower) newSlideLower = cursorPosMs;
      if (timebarMode === 'Fixed' && cursorPosMs > slideUpper) newSlideUpper = cursorPosMs;
      this.setState({ current: cursorPosMs, slideLower: newSlideLower, slideUpper: newSlideUpper });
    }
  }

  onMouseDownResize = (e) => {
    const { visuWindow, slideWindow } = this.props;
    const cursor = e.target.getAttribute('cursor');
    let newResizeOrigin;
    if (['lower', 'upper'].includes(cursor)) {
      newResizeOrigin = visuWindow[cursor];
    } else if (cursor === 'slideLower') {
      newResizeOrigin = slideWindow.lower;
    } else if (cursor === 'slideUpper') {
      newResizeOrigin = slideWindow.upper;
    }
    this.setState({
      resizing: true,
      dragging: false,
      navigating: false,
      resizeCursor: cursor,
      cursorOriginX: e.pageX,
      resizeOrigin: newResizeOrigin
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onMouseDownNavigate = (e) => {
    const { visuWindow, viewport } = this.props;
    this.setState({
      navigating: true,
      dragging: false,
      resizing: false,
      cursorOriginX: e.pageX,
      resizeOrigin: visuWindow.current,
      viewportLower: viewport.lower,
      viewportUpper: viewport.upper
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onWheel = (e) => {
    e.preventDefault();

    const { viewport, visuWindow, slideWindow } = this.props;
    const viewportLower = this.state.viewportLower || viewport.lower;
    const viewportUpper = this.state.viewportUpper || viewport.upper;

    if (e.ctrlKey) {
      let { lower, upper, current, slideLower, slideUpper } = this.state;
      lower = lower || visuWindow.lower;
      upper = upper || visuWindow.upper;
      current = current || visuWindow.current;
      slideLower = slideLower || slideWindow.lower;
      slideUpper = slideUpper || slideWindow.upper;
      const { cursorMs } = this.state;
      const coeff = e.deltaY > 0 ? -1 : 1;

      lower += coeff * ((cursorMs - lower) / 5);
      upper += coeff * ((cursorMs - upper) / 5);
      current += coeff * ((cursorMs - current) / 5);
      slideLower += coeff * ((cursorMs - slideLower) / 5);
      slideUpper += coeff * ((cursorMs - slideUpper) / 5);
      this.setState({ lower, upper, current, slideLower, slideUpper });
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
      const offsetLeftMs = coeff * ((viewportUpper - viewportLower) * percentOffsetWithLeft);
      const offsetRightMs = coeff * ((viewportUpper - viewportLower) * percentOffsetWithRight);

      const newViewportLower = viewportLower + offsetLeftMs;
      const newViewportUpper = viewportUpper + offsetRightMs;

      this.setState({
        viewportLower: newViewportLower,
        viewportUpper: newViewportUpper
      });

      if (!this.debounced2) {
        this.debounced2 = debounce(this.autoUpdateViewportWindow, 300);
      }
      this.debounced2();
    }
  }

  onTimescaleNavigate = (viewportLower, viewportUpper, save) => {
    if (viewportLower < minViewportLower || viewportUpper > maxViewportUpper) return;
    if (save) {
      const { timebarId, onChange } = this.props;
      this.setState({
        viewportLower: null,
        viewportUpper: null
      });
      onChange(
        timebarId,
        {
          viewport: {
            lower: viewportLower,
            upper: viewportUpper
          }
        }
      );
    } else {
      this.setState({
        viewportLower,
        viewportUpper
      });
    }
  }

  autoUpdateViewportWindow = () => {
    const { timebarId, onChange } = this.props;
    const { viewportLower, viewportUpper } = this.state;

    onChange(
      timebarId,
      {
        viewport: {
          lower: viewportLower,
          upper: viewportUpper
        }
      }
    );
    this.setState({ viewportLower: null, viewportUpper: null });
  }

  autoUpdateVisuWindow = () => {
    const { timebarId, onChange } = this.props;
    const { lower, upper, current, slideLower, slideUpper } = this.state;
    onChange(
      timebarId,
      {
        lower,
        upper,
        current,
        slideWindow: {
          lower: slideLower,
          upper: slideUpper,
        }
      }
    );
    this.setState({ lower: null, upper: null, current: null, slideLower: null, slideUpper: null });
  }

  updateCursorTime = (e) => {
    e.stopPropagation();
    const { viewport } = this.props;
    const { lower, upper } = viewport;
    const offsetPx = e.pageX - this.el.getBoundingClientRect().left;
    const cursorMs = lower + ((upper - lower) * (offsetPx / this.el.offsetWidth));
    this.setState({
      cursorMs,
      formatedFullDate: moment(cursorMs).format('D MMMM YYYY HH[:]mm[:]ss[.]SSS')
    });
  }

  dragNavigate = () => {
    const { slideLower, slideUpper, dragNavigating,
      dragNavigatingOffset, cursorOriginX, lower,
      upper, current, viewportLower, viewportUpper } = this.state;
    const viewportMsWidth = viewportUpper - viewportLower;

    if (dragNavigating) {
      const offsetMs = viewportMsWidth / dragNavigatingOffset;
      const newViewportLower = viewportLower + offsetMs;
      const newViewportUpper = viewportUpper + offsetMs;
      if (newViewportLower < minViewportLower || newViewportUpper > maxViewportUpper) {
        setTimeout(this.dragNavigate, 60);
        return;
      }
      this.setState({
        viewportLower: newViewportLower,
        viewportUpper: newViewportUpper,
        cursorOriginX: cursorOriginX - (this.el.clientWidth / dragNavigatingOffset),
        slideLower: slideLower + offsetMs,
        slideUpper: slideUpper + offsetMs,
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

    let newViewportLower;
    let newViewportUpper;
    if (side === 'left') {
      newViewportLower = lower - ((upper - lower) / 5);
      newViewportUpper = upper + ((upper - lower) * 2);
    } else if (side === 'right') {
      newViewportLower = lower - ((upper - lower) * 2);
      newViewportUpper = upper + ((upper - lower) / 5);
    }
    onChange(
      timebarId,
      {
        viewport: {
          lower: newViewportLower,
          upper: newViewportUpper,
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
    const { visuWindow, viewport, onChange, timebarId, timebarMode } = this.props;

    if (e.currentTarget.getAttribute('cursor') === 'extBound') {
      const { lower, upper, current } = visuWindow;
      onChange(
        timebarId,
        {
          slideWindow: {
            lower: lower + ((current - lower) / 2),
            upper: timebarMode === 'Extensible' ? upper + ((upper - lower) / 4) : upper - ((upper - current) / 2)
          }
        }
      );
    } else {
      const viewportWindowWidthMs = viewport.upper - viewport.lower;
      const newLower = viewport.lower + (viewportWindowWidthMs * (5 / 12));
      const newUpper = viewport.lower + (viewportWindowWidthMs * (7 / 12));
      const newCurrent = (newLower + newUpper) / 2;
      onChange(
        timebarId,
        {
          lower: newLower,
          upper: newUpper,
          current: newCurrent,
          slideWindow: {
            lower: newLower + ((newCurrent - newLower) / 2),
            upper: newUpper - ((newUpper - newCurrent) / 2)
          }
        }
      );
    }
  }

  calculate = () => {
    const { visuWindow, slideWindow, viewport } = this.props;

    let { lower, upper, current } = this.state;
    lower = lower || visuWindow.lower || ((new Date().getTime()) - (1000 * 60 * 48));
    upper = upper || visuWindow.upper || ((new Date().getTime()) + (1000 * 60 * 48));
    current = current || visuWindow.current || (lower + upper) / 2;

    let { viewportLower, viewportUpper, slideLower, slideUpper } = this.state;
    viewportLower = viewportLower || viewport.lower || lower - ((upper - lower) * 2);
    viewportUpper = viewportUpper || viewport.upper || upper + ((upper - lower) * 2);
    slideLower = slideLower || slideWindow.lower || lower + ((upper - lower) / 10);
    slideUpper = slideUpper || slideWindow.upper || upper - ((upper - lower) / 10);

    const selectedMsWidth = upper - lower;
    const selectedPercentWidth = (100 * selectedMsWidth) / (viewportUpper - viewportLower);
    const lowerPercentOffset = (100 * (lower - viewportLower)) / (viewportUpper - viewportLower);
    const slideLowerPercentOffset = (100 *
      (slideLower - viewportLower)) / (viewportUpper - viewportLower);
    const slideUpperPercentOffset = (100 *
      (slideUpper - viewportLower)) / (viewportUpper - viewportLower);
    const currentPercentOffset = (100 * (current - lower)) / (upper - lower);
    return {
      selectedMsWidth,
      selectedPercentWidth,
      lowerPercentOffset,
      slideLowerPercentOffset,
      slideUpperPercentOffset,
      currentPercentOffset
    };
  }

  render() {
    const { visuWindow, timelines, displayTimesetter,
      timebarMode, viewport, slideWindow } = this.props;
    const { dragging, resizing, formatedFullDate } = this.state;
    const { state } = this;

    if (!viewport) return (<div />);

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const current = state.current || visuWindow.current;
    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;

    const calc = this.calculate();

    let arrowLeft;
    if (upper <= viewportLower) {
      arrowLeft = (
        <div>
          <button title="Navigate to current cursor" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowLeft)} onClick={this.rePosition.bind(null, 'left')} />
          <button title="Bring cursors in the viewport" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowLeft, styles.arrowLeftBring)} onClick={this.bringCursors} />
        </div>
      );
    }
    let arrowRight;
    if (lower >= viewportUpper) {
      arrowRight = (
        <div>
          <button title="Navigate to current cursor" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowRight)} onClick={this.rePosition.bind(null, 'right')} />
          <button title="Bring cursors in the viewport" className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowRight, styles.arrowRightBring)} onClick={this.bringCursors} />
        </div>
      );
    }

    let bringExtBound;
    if (!arrowRight && !arrowLeft && timebarMode !== 'Normal' &&
      (slideLower < viewportLower || slideUpper > viewportUpper)) {
      bringExtBound = (
        <div>
          <button
            cursor="extBound"
            title="Bring the exterior cursors in the viewport"
            className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowExt)}
            onClick={this.bringCursors}
          >
            EXT
          </button>
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
          { arrowLeft }{ arrowRight }{ bringExtBound }
          <span className={styles.slideLower}>{this.formatDate(viewportLower)}</span>
          <span className={styles.slideUpper}>{this.formatDate(viewportUpper)}</span>
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
            <span
              className={styles.lowerFormattedTime}
            >{this.formatDate(lower, true)}</span>
            <span
              className={styles.currentFormattedTime}
              style={{ left: `${calc.currentPercentOffset}%` }}
            >{this.formatDate(current, true)}</span>
            <span
              className={styles.upperFormattedTime}
            >{this.formatDate(upper, true)}</span>
          </div>
          <span
            cursor="slideLower"
            title="Ext lower cursor"
            style={{
              left: `${calc.slideLowerPercentOffset}%`
            }}
            className={classnames(styles.extBound, { hidden: timebarMode !== 'Fixed' })}
            onMouseDown={this.onMouseDownResize}
            onDoubleClick={displayTimesetter}
          />
          <span
            cursor="slideUpper"
            title="Ext upper cursor"
            style={{
              left: `${calc.slideUpperPercentOffset}%`
            }}
            className={classnames(styles.extBound, { hidden: timebarMode === 'Normal' })}
            onMouseDown={this.onMouseDownResize}
            onDoubleClick={displayTimesetter}
          />
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
          viewportLower={viewportLower}
          viewportUpper={viewportUpper}
          onChange={this.onTimescaleNavigate}
        />
      </div>
    );
  }
}

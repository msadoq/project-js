import moment from 'moment';
import { get } from 'common/parameters';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';
import classnames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';

import styles from './Timebar.css';
import Scale from './Scale';
import TimebarTimeline from './TimebarTimeline';

const VISUWINDOW_MAX_LENGTH = get('VISUWINDOW_MAX_LENGTH');
// 1980-01-01
const minViewportLower = 315532800000;
// 2040-01-01
const maxViewportUpper = 2208988800000;

// Shortcut keyboard : html keycodes (event.keyCode)
const keys = {
  w: 87,
  x: 88,
  c: 67,
  v: 86,
  b: 66,
  n: 78,
  space: 32,
};

export default class Timebar extends PureComponent {

  static propTypes = {
    retrieveFormattedFullDateEl: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    setRealTime: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    onVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    slideWindow: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
    }).isRequired,
    visuWindow: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      defaultWidth: PropTypes.number.isRequired,
    }).isRequired,
    viewport: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
    }).isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        timelineId: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
      })
    ).isRequired,
    isPlaying: PropTypes.bool.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarRealTime: PropTypes.bool.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    verticalScroll: PropTypes.number.isRequired,
    widthPx: PropTypes.number.isRequired,
  }

  state = {
    dragging: false,
    resizing: false,
    navigating: false,
    dragNavigating: false,
    resizeCursor: null,

    cursorOriginX: null,
    dragOriginLower: null,
    dragOriginUpper: null,
    dragOriginCurrent: null,
    dragOriginSlideLower: null,
    dragOriginSlideUpper: null,
    dragNavigatingOffset: null,

    cursorMs: null,
    viewportLower: null,
    viewportUpper: null,
    slideLower: null,
    slideUpper: null,
    lower: null,
    upper: null,
    current: null,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onShortcut);
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
      const {
        visuWindow,
        timebarUuid,
        updateCursors,
        jump,
        timebarMode,
        isPlaying,
        play,
        pause,
        slideWindow,
      } = this.props;
      const { lower, upper, current } = visuWindow;
      const { cursorMs } = this.state;

      switch (e.keyCode) {
        case keys.w:
          jump(timebarUuid, cursorMs - current);
          break;
        case keys.x:
          if (cursorMs > current) return;
          if (['Normal', 'Fixed'].includes(timebarMode) && cursorMs > slideWindow.lower) return;
          updateCursors(
            timebarUuid,
            { lower: cursorMs },
            null
          );
          break;
        case keys.c:
          if (timebarMode === 'Normal') return;
          if (timebarMode === 'Extensible') return;
          if (timebarMode === 'Fixed' && (cursorMs < lower || cursorMs > current)) return;
          updateCursors(
            timebarUuid,
            null,
            { lower: cursorMs }
          );
          break;
        case keys.v:
          if (cursorMs < lower || cursorMs > upper) return;
          if (['Normal', 'Fixed'].includes(timebarMode) &&
            (cursorMs < slideWindow.lower || cursorMs > slideWindow.upper)) return;
          if (timebarMode === 'Extensible' && cursorMs < slideWindow.lower) return;
          updateCursors(
            timebarUuid,
            { current: cursorMs },
            null
          );
          break;
        case keys.b:
          if (timebarMode === 'Normal') return;
          if (timebarMode === 'Extensible' && cursorMs < upper) return;
          if (timebarMode === 'Fixed' && (cursorMs < current || cursorMs > upper)) return;
          updateCursors(
            timebarUuid,
            null,
            {
              lower: slideWindow.lower,
              upper: cursorMs,
            }
          );
          break;
        case keys.n:
          if (cursorMs < current) return;
          if (timebarMode === 'Extensible' && cursorMs > slideWindow.upper) return;
          if (['Normal', 'Fixed'].includes(timebarMode) && cursorMs < slideWindow.upper) return;
          updateCursors(
            timebarUuid,
            { upper: cursorMs },
            null
          );
          break;
        case keys.space:
          if (isPlaying) {
            pause();
          } else {
            play(timebarUuid);
          }
          break;
        default:
          break;
      }
    }
  }

  onMouseDown = (e) => {
    if (e.target.tagName === 'SPAN') {
      e.stopPropagation();
      return;
    }

    const {
      visuWindow,
      slideWindow,
      setRealTime,
      timebarRealTime,
      viewport,
      timebarUuid,
    } = this.props;
    const { state } = this;

    if (timebarRealTime) {
      setRealTime(timebarUuid, false);
    }

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
      slideLower: slideWindow.upper,
    });

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onMouseUp = (e) => {
    e.preventDefault();
    const {
      slideWindow,
      visuWindow,
      viewport,
      updateViewport,
      updateCursors,
      timebarUuid,
      widthPx,
    } = this.props;
    const { state } = this;

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;
    const current = state.current || visuWindow.current;
    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;

    if (state.resizing || state.navigating) {
      updateCursors(
        timebarUuid,
        { lower, upper, current },
        {
          lower: slideLower,
          upper: slideUpper,
        }
      );
    } else {
      if (viewportLower !== viewport.lower || viewportUpper !== viewport.upper) {
        updateViewport(
          timebarUuid,
          viewportLower,
          (viewportUpper - viewportLower) / widthPx
        );
      }
      if (
        lower !== visuWindow.lower ||
        upper !== visuWindow.upper ||
        current !== visuWindow.current ||
        slideLower !== slideWindow.lower ||
        slideUpper !== slideWindow.upper
      ) {
        updateCursors(
          timebarUuid,
          { lower, upper, current },
          {
            lower: slideLower,
            upper: slideUpper,
          }
        );
      }
    }

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    /*
      Resetting every state to null, so newly received props will
      be used to render components positions (cursors etc...)
    */
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
      slideUpper: null,
    });
  }

  onMouseMoveDragging = (e, viewportMsWidth) => {
    const {
      widthPx,
      pause,
      isPlaying,
    } = this.props;
    const {
      cursorOriginX,
      dragOriginLower,
      dragOriginUpper,
      dragNavigating,
      dragOriginSlideLower,
      dragOriginCurrent,
      dragOriginSlideUpper,
    } = this.state;
    if (isPlaying) {
      pause();
    }
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

      const offsetRel = (mult * 20) / ((abs / 100) * pow);
      this.setState({ dragNavigatingOffset: offsetRel });
      if (!dragNavigating) {
        this.setState({ dragNavigating: true });
        setTimeout(this.dragNavigate, 60);
      }
    } else {
      this.setState({ dragNavigating: false });
    }

    const movedPercent = (e.pageX - cursorOriginX) / widthPx;
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
  }

  onMouseMoveResizing = () => {
    const {
      timebarMode,
      visuWindow,
      viewport,
      slideWindow,
    } = this.props;
    const { state } = this;
    const {
      resizeCursor,
    } = state;
    let cursorPosMs = this.state.cursorMs;

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const current = state.current || visuWindow.current;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;
    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;

    // visuWindow.lower cursor
    if (resizeCursor === 'lower') {
      let newSlideLower = slideLower;
      // Max length
      if (upper - cursorPosMs > VISUWINDOW_MAX_LENGTH) {
        cursorPosMs = upper - VISUWINDOW_MAX_LENGTH;
      }
      if (cursorPosMs > current) cursorPosMs = current;
      if (cursorPosMs < viewportLower) cursorPosMs = viewportLower;
      if (cursorPosMs > upper) cursorPosMs = upper - 2000;
      if (cursorPosMs > newSlideLower) newSlideLower = cursorPosMs;

      this.setState({
        lower: cursorPosMs,
        slideLower: newSlideLower,
      });

    // visuWindow.upper cursor
    } else if (resizeCursor === 'upper') {
      let newSlideUpper = slideUpper;
      // Max length
      if (cursorPosMs - lower > VISUWINDOW_MAX_LENGTH) {
        cursorPosMs = lower + VISUWINDOW_MAX_LENGTH;
      }
      if (cursorPosMs < current) cursorPosMs = current;
      if (cursorPosMs > viewportUpper) cursorPosMs = viewportUpper;
      if (timebarMode === 'Extensible' && cursorPosMs > newSlideUpper) newSlideUpper = cursorPosMs;
      if (['Fixed', 'Normal'].includes(timebarMode) && cursorPosMs < newSlideUpper) newSlideUpper = cursorPosMs;
      this.setState({
        upper: cursorPosMs,
        slideUpper: newSlideUpper,
      });

    // slideWindow.lower cursor
    } else if (resizeCursor === 'slideLower') {
      if (cursorPosMs < lower) cursorPosMs = lower;
      if (cursorPosMs > current) cursorPosMs = current;
      this.setState({ slideLower: cursorPosMs });

    // slideWindow.upper cursor
    } else if (resizeCursor === 'slideUpper') {
      // Max length
      if (cursorPosMs - lower > VISUWINDOW_MAX_LENGTH) {
        cursorPosMs = lower + VISUWINDOW_MAX_LENGTH;
      }
      if (timebarMode === 'Extensible' && cursorPosMs < upper) cursorPosMs = upper;
      if (timebarMode === 'Fixed' && cursorPosMs > upper) cursorPosMs = upper;
      if (cursorPosMs < current) cursorPosMs = current;
      this.setState({ slideUpper: cursorPosMs });
    }
  }

  onMouseMoveNavigating = () => {
    const {
      visuWindow,
      slideWindow,
      timebarMode,
    } = this.props;
    const { state } = this;
    const { cursorMs } = state;

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const slideUpper = state.slideUpper || slideWindow.upper;
    const slideLower = state.slideLower || slideWindow.lower;

    if (timebarMode === 'Normal') {
      if (cursorMs < lower || cursorMs > upper) {
        let diff = 0;
        if (cursorMs < lower) diff = cursorMs - lower;
        if (cursorMs > upper) diff = cursorMs - upper;
        this.setState({
          current: cursorMs,
          lower: lower + diff,
          upper: upper + diff,
          slideLower: lower + diff,
          slideUpper: upper + diff,
        });
      } else {
        this.setState({
          current: cursorMs,
          slideLower: lower,
          slideUpper: upper,
        });
      }
    } else if (timebarMode === 'Fixed') {
      if (cursorMs < slideLower || cursorMs > slideUpper) {
        let diff = 0;
        if (cursorMs < slideLower) diff = cursorMs - slideLower;
        if (cursorMs > slideUpper) diff = cursorMs - slideUpper;
        this.setState({
          current: cursorMs,
          lower: lower + diff,
          upper: upper + diff,
          slideLower: slideLower + diff,
          slideUpper: slideUpper + diff,
        });
      } else {
        this.setState({ current: cursorMs });
      }
    } else if (timebarMode === 'Extensible') {
      if (cursorMs < lower || cursorMs > upper) {
        let diff = 0;
        if (cursorMs < lower) diff = cursorMs - lower;
        if (cursorMs > upper) diff = cursorMs - upper;
        this.setState({
          current: cursorMs,
          lower: lower + diff,
          upper: upper + diff,
          slideLower: lower + diff,
          slideUpper: slideUpper + diff,
        });
      } else {
        this.setState({
          current: cursorMs,
          slideLower: lower,
        });
      }
    }
  }

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { viewport } = this.props;
    const { state } = this;
    const {
      dragging,
      resizing,
      navigating,
    } = state;

    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;

    const viewportMsWidth = viewportUpper - viewportLower;

    /*
      Dragging the red area (between visuWindow.lower and visuWindow.upper)
    */
    if (dragging) {
      this.onMouseMoveDragging(e, viewportMsWidth);
    /*
      Resizing any of the 4 slideWindow.lower,
      slideWindow.upper, visuWindow.lower, visuWindow.upper cursors
    */
    } else if (resizing) {
      this.onMouseMoveResizing();
    /*
      Moving the current cursor
    */
    } else if (navigating) {
      this.onMouseMoveNavigating();
    }
  }

  /*
    Clicked on any of the 4 slideWindow.lower,
    slideWindow.upper, visuWindow.lower, visuWindow.upper cursors
  */
  onMouseDownResize = (e) => {
    const {
      isPlaying,
      pause,
    } = this.props;
    const cursor = e.target.getAttribute('cursor');
    this.setState({
      resizing: true,
      dragging: false,
      navigating: false,
      resizeCursor: cursor,
      cursorOriginX: e.pageX,
    });
    if (isPlaying) {
      pause();
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  /*
    Clicked on the current cursor
  */
  onMouseDownNavigate = (e) => {
    const {
      viewport,
      timebarRealTime,
      setRealTime,
      timebarUuid,
      isPlaying,
      pause,
    } = this.props;

    if (timebarRealTime) {
      setRealTime(timebarUuid, false);
    }

    this.setState({
      navigating: true,
      dragging: false,
      resizing: false,
      cursorOriginX: e.pageX,
      viewportLower: viewport.lower,
      viewportUpper: viewport.upper,
    });
    if (isPlaying) {
      pause();
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.stopPropagation();
  }

  onWheel = (e) => {
    e.preventDefault();

    const {
      viewport,
      visuWindow,
      slideWindow,
      isPlaying,
      pause,
    } = this.props;
    const viewportLower = this.state.viewportLower || viewport.lower;
    const viewportUpper = this.state.viewportUpper || viewport.upper;

    /*
      Will reposition only the cursors, the viewport does'nt change
    */
    if (e.ctrlKey && e.altKey) {
      if (isPlaying) {
        pause();
      }
      let { lower, upper, current, slideLower, slideUpper } = this.state;
      lower = lower || visuWindow.lower;
      upper = upper || visuWindow.upper;
      current = current || visuWindow.current;
      slideLower = slideLower || slideWindow.lower;
      slideUpper = slideUpper || slideWindow.upper;

      const coeff = e.deltaY > 0 ? -1 : 1;
      const { cursorMs } = this.state;
      lower += coeff * ((cursorMs - lower) / 5);
      upper += coeff * ((cursorMs - upper) / 5);
      current += coeff * ((cursorMs - current) / 5);
      slideLower += coeff * ((cursorMs - slideLower) / 5);
      slideUpper += coeff * ((cursorMs - slideUpper) / 5);

      if (upper - lower > VISUWINDOW_MAX_LENGTH) {
        return;
      }

      this.setState({
        lower,
        upper,
        current,
        slideLower,
        slideUpper,
      });

      if (!this.debounced1) {
        this.debounced1 = _debounce(this.autoUpdateCursors, 300);
      }
      this.debounced1();

    /*
      Will reposition the viewportn cursors's position does'nt change
    */
    } else if (e.ctrlKey) {
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
        viewportUpper: newViewportUpper,
      });

      if (!this.debounced2) {
        this.debounced2 = _debounce(this.autoUpdateViewportWindow, 300);
      }
      this.debounced2();
    }
  }

  /*
    Navigating through the timescale, method called from child Timescale
  */
  onTimescaleNavigate = (viewportLower, viewportUpper, save) => {
    if (viewportLower < minViewportLower || viewportUpper > maxViewportUpper) {
      return;
    }

    /*
      End of the navigation (the user dropped the mouse button)
    */
    if (save) {
      const { timebarUuid, updateViewport, widthPx } = this.props;
      this.setState({
        viewportLower: null,
        viewportUpper: null,
      });
      updateViewport(
        timebarUuid,
        viewportLower,
        (viewportUpper - viewportLower) / widthPx
      );

    /*
      The user is still holding the mouse button and navigating
    */
    } else {
      this.setState({ viewportLower, viewportUpper });
    }
  }

  autoUpdateViewportWindow = () => {
    const { timebarUuid, updateViewport, widthPx } = this.props;
    const { viewportLower, viewportUpper } = this.state;

    updateViewport(
      timebarUuid,
      viewportLower,
      (viewportUpper - viewportLower) / widthPx
    );
    this.setState({
      viewportLower: null,
      viewportUpper: null,
    });
  }

  autoUpdateCursors = () => {
    const { timebarUuid, updateCursors } = this.props;
    const {
      lower,
      upper,
      current,
      slideLower,
      slideUpper,
    } = this.state;
    updateCursors(
      timebarUuid,
      { lower, upper, current },
      {
        lower: slideLower,
        upper: slideUpper,
      }
    );
    this.setState({
      lower: null,
      upper: null,
      current: null,
      slideLower: null,
      slideUpper: null,
    });
  }

  hideCursorTime = () => {
    setTimeout(() => {
      this.props.retrieveFormattedFullDateEl().innerHTML = '';
    }, 150);
  }

  willUpdateCursorTime = (e) => {
    e.stopPropagation();
    if (!this.cursorTimeThrottle) {
      this.cursorTimeThrottle = _throttle(this.updateCursorTime, 100);
    }
    this.cursorTimeThrottle(e.pageX);
  }

  updateCursorTime = (pageX) => {
    const { retrieveFormattedFullDateEl, widthPx } = this.props;
    const { lower, upper } = this.props.viewport;
    const offsetPx = pageX - this.el.getBoundingClientRect().left;
    const cursorMs = lower + ((upper - lower) * (offsetPx / widthPx));
    this.setState({ cursorMs });
    retrieveFormattedFullDateEl().innerHTML = moment(cursorMs).format('D MMMM YYYY HH[:]mm[:]ss[.]SSS');
  }

  dragNavigate = () => {
    const {
      slideLower,
      slideUpper,
      dragNavigating,
      dragNavigatingOffset,
      cursorOriginX,
      lower,
      upper,
      current,
      viewportLower,
      viewportUpper,
    } = this.state;
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
        cursorOriginX: cursorOriginX - (this.props.widthPx / dragNavigatingOffset),
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

  rePosition = (side, e) => {
    e.preventDefault();
    const {
      visuWindow,
      updateViewport,
      timebarUuid,
      widthPx,
    } = this.props;
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
    updateViewport(
      timebarUuid,
      newViewportLower,
      (newViewportUpper - newViewportLower) / widthPx
    );
    this.setState({
      slideLower: null,
      slideUpper: null,
    });
  }

  bringCursors = (e) => {
    e.preventDefault();
    const {
      visuWindow,
      viewport,
      timebarUuid,
      timebarMode,
      updateCursors,
    } = this.props;

    /*
      The user clicked the EXT button
    */
    if (e.currentTarget.getAttribute('cursor') === 'extBound') {
      const { lower, upper } = visuWindow;
      updateCursors(timebarUuid, null, { lower, upper });

    /*
      The user clicked the arrow grey button
    */
    } else {
      const center = viewport.lower + ((viewport.upper - viewport.lower) / 2);
      const viewportWindowWidthMs = viewport.upper - viewport.lower;
      if (['Normal', 'Fixed'].includes(timebarMode)) {
        updateCursors(
          timebarUuid,
          {
            lower: center - (viewportWindowWidthMs / 4),
            upper: center + (viewportWindowWidthMs / 4),
            current: center,
          },
          {
            lower: center - (viewportWindowWidthMs / 6),
            upper: center + (viewportWindowWidthMs / 6),
          }
        );
      } else if (timebarMode === 'Extensible') {
        updateCursors(
          timebarUuid,
          {
            lower: center - (viewportWindowWidthMs / 4),
            upper: center + (viewportWindowWidthMs / 4),
            current: center,
          },
          {
            lower: center - (viewportWindowWidthMs / 6),
            upper: center + (viewportWindowWidthMs / 3),
          }
        );
      }
    }
  }

  calculate = () => {
    const {
      visuWindow,
      slideWindow,
      viewport,
    } = this.props;

    /*
      In the following assignations, the third value should never be reached
      value is always in the state (some user action is going on) or in the props
    */

    let {
      lower,
      upper,
      current,
    } = this.state;
    lower = lower || visuWindow.lower || ((new Date().getTime()) - (1000 * 60 * 48));
    upper = upper || visuWindow.upper || ((new Date().getTime()) + (1000 * 60 * 48));
    current = current || visuWindow.current || (lower + upper) / 2;

    let {
      viewportLower,
      viewportUpper,
      slideLower,
      slideUpper,
    } = this.state;
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
      currentPercentOffset,
    };
  }

  assignTimelinesEl = (el) => { this.timelinesEl = el; }
  assignEl = (el) => { this.el = el; }
  bindRePositionLeft = this.rePosition.bind(this, 'left')
  bindRePositionRight = this.rePosition.bind(this, 'right')

  render() {
    const {
      visuWindow,
      timelines,
      toggleTimesetter,
      timebarMode,
      viewport,
      slideWindow,
      widthPx,
    } = this.props;
    const { state } = this;
    const {
      dragging,
      resizing,
    } = state;

    const lower = state.lower || visuWindow.lower;
    const upper = state.upper || visuWindow.upper;
    const current = state.current || visuWindow.current;
    const viewportLower = state.viewportLower || viewport.lower;
    const viewportUpper = state.viewportUpper || viewport.upper;
    const slideLower = state.slideLower || slideWindow.lower;
    const slideUpper = state.slideUpper || slideWindow.upper;

    const calc = this.calculate();

    let arrowsLeft;
    if (upper <= viewportLower) {
      arrowsLeft = (
        <div>
          <button
            title="Navigate to current cursor"
            className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowLeft)}
            onClick={this.bindRePositionLeft}
          >←</button>
          <button
            title="Bring cursors in the viewport"
            className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowLeft, styles.arrowLeftBring)}
            onClick={this.bringCursors}
          >→</button>
        </div>
      );
    }
    let arrowsRight;
    if (lower >= viewportUpper) {
      arrowsRight = (
        <div>
          <button
            title="Navigate to current cursor"
            className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowRight)}
            onClick={this.bindRePositionRight}
          >→</button>
          <button
            title="Bring cursors in the viewport"
            className={classnames('btn', 'btn-sm', 'btn-primary', styles.arrowRight, styles.arrowRightBring)}
            onClick={this.bringCursors}
          >←</button>
        </div>
      );
    }

    let bringExtBound;
    if (!arrowsRight && !arrowsLeft && timebarMode !== 'Normal' &&
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

    /*
      Moving up the lower / upper cursors formatted dates when too close to current
    */
    const lowerPercent = calc.lowerPercentOffset;
    const upperPercent = lowerPercent + calc.selectedPercentWidth;
    const currentPercent = lowerPercent + ((upperPercent - lowerPercent) *
      (calc.currentPercentOffset * 0.01));

    /*
      Determinate for each cursor if we display a handle to help
      the user
    */
    const lowerCurrentClose = (currentPercent - lowerPercent) * (widthPx * 0.01) < 20;
    const upperCurrentClose = (upperPercent - currentPercent) * (widthPx * 0.01) < 20;
    const slideUpperUpperClose = Math.abs((upperPercent - calc.slideUpperPercentOffset)
      * (widthPx * 0.01)) < 20 && timebarMode !== 'Normal';
    const slideUpperCurrentClose = Math.abs((calc.slideUpperPercentOffset - currentPercent)
      * (widthPx * 0.01)) < 20 && timebarMode !== 'Normal';
    const slideLowerCurrentClose = Math.abs((currentPercent - calc.slideLowerPercentOffset)
      * (widthPx * 0.01)) < 20 && timebarMode === 'Fixed';
    const slideLowerLowerClose = Math.abs((calc.slideLowerPercentOffset - lowerPercent)
      * (widthPx * 0.01)) < 20 && timebarMode === 'Fixed';
    const moveLower = (currentPercent - lowerPercent) * (widthPx * 0.01) < 40;
    const moveUpper = (upperPercent - currentPercent) * (widthPx * 0.01) < 40;

    return (
      <div
        className={styles.viewportWrapper}
        ref={this.assignEl}
        onMouseMove={this.willUpdateCursorTime}
        onMouseLeave={this.hideCursorTime}
      >
        <div
          className={styles.viewportContainer}
          onWheel={this.onWheel}
        >
          { arrowsLeft }
          { arrowsRight }
          { bringExtBound }

          { /*
            The red div that contains the lower, current and upper cursors
            lower and upper are absolutely positionned on the right and left of
            this div
          */ }
          <div
            className={
              classnames(
                styles.visuWindow,
                (dragging ? styles.viewportDragging : null),
                (resizing ? styles.viewportResizing : null)
              )
            }
            style={{
              left: `${calc.lowerPercentOffset}%`,
              width: `${calc.selectedPercentWidth}%`,
            }}
            onMouseDown={this.onMouseDown}
          >

            { /*
              The 3 main cursors
            */ }
            <span
              cursor="lower"
              className={styles.lower}
              onMouseDown={this.onMouseDownResize}
              onDoubleClick={toggleTimesetter}
            />

            { /*
              Circle handle for lower cursor
            */ }
            <span
              cursor="lower"
              className={classnames(
                styles.handle,
                styles.handleLower,
                { [styles.undisplayed]: !lowerCurrentClose && !slideLowerLowerClose }
              )}
              onMouseDown={this.onMouseDownResize}
              onDoubleClick={toggleTimesetter}
            />
            <span
              cursor="current"
              className={styles.current}
              style={{ left: `${calc.currentPercentOffset}%` }}
              onMouseDown={this.onMouseDownNavigate}
              onDoubleClick={toggleTimesetter}
            />

            { /*
              Circle handle for current cursor
            */ }
            <span
              cursor="current"
              className={classnames(
                styles.handle,
                styles.handleCurrent,
                { [styles.undisplayed]: !lowerCurrentClose && !upperCurrentClose &&
                  !slideUpperCurrentClose && !slideLowerCurrentClose }
              )}
              style={{ left: `${calc.currentPercentOffset}%` }}
              onMouseDown={this.onMouseDownNavigate}
              onDoubleClick={toggleTimesetter}
            />
            <span
              cursor="upper"
              className={styles.upper}
              onMouseDown={this.onMouseDownResize}
              onDoubleClick={toggleTimesetter}
            />

            { /*
              Circle handle for upper cursor
            */ }
            <span
              cursor="upper"
              className={classnames(
                styles.handle,
                styles.handleUpper,
                { [styles.undisplayed]: !upperCurrentClose && !slideUpperUpperClose }
              )}
              onMouseDown={this.onMouseDownResize}
              onDoubleClick={toggleTimesetter}
            />

            { /*
              The 3 main cursors's formatted dates
            */ }
            <span
              className={classnames(
                styles.lowerFormattedTime,
                {
                  [styles.moved]: moveLower,
                  hidden: lower === current,
                }
              )}
            >
              {this.formatDate(lower, true)}
            </span>
            <span
              className={styles.currentFormattedTime}
              style={{ left: `${calc.currentPercentOffset}%` }}
            >
              {this.formatDate(current, true)}
            </span>
            <span
              className={classnames(
                styles.upperFormattedTime,
                {
                  [styles.moved]: moveUpper,
                  hidden: upper === current,
                }
              )}
            >
              {this.formatDate(upper, true)}
            </span>
          </div>

          { /*
            The 2 blue sildeWindow cursors
          */ }
          <span
            cursor="slideLower"
            title="Ext lower cursor"
            style={{
              left: `${calc.slideLowerPercentOffset}%`,
            }}
            className={classnames(styles.slide, { hidden: timebarMode !== 'Fixed' })}
            onMouseDown={this.onMouseDownResize}
            onDoubleClick={toggleTimesetter}
          />

          { /*
            Circle handle for slideLower cursor
          */ }
          <span
            cursor="slideLower"
            className={classnames(
              styles.handle,
              styles.handleSlideLower,
              { [styles.undisplayed]: !slideLowerLowerClose && !slideLowerCurrentClose }
            )}
            style={{
              left: `${calc.slideLowerPercentOffset}%`,
            }}
            onMouseDown={this.onMouseDownResize}
            onDoubleClick={toggleTimesetter}
          />
          <span
            cursor="slideUpper"
            title="Ext upper cursor"
            style={{
              left: `${calc.slideUpperPercentOffset}%`,
            }}
            className={classnames(styles.slide, { hidden: timebarMode === 'Normal' })}
            onMouseDown={this.onMouseDownResize}
            onDoubleClick={toggleTimesetter}
          />

          { /*
            Circle handle for slideUpper cursor
          */ }
          <span
            cursor="slideUpper"
            className={classnames(
              styles.handle,
              styles.handleSlideUpper,
              { [styles.undisplayed]: !slideUpperUpperClose && !slideUpperCurrentClose }
            )}
            style={{
              left: `${calc.slideUpperPercentOffset}%`,
            }}
            onMouseDown={this.onMouseDownResize}
            onDoubleClick={toggleTimesetter}
          />

          { /*
              Timeline list in the background
          */ }
          <div
            ref={this.assignTimelinesEl}
            className={styles.timelines}
            onScroll={this.props.onVerticalScroll}
          >
            { timelines.map(v =>
              <TimebarTimeline
                key={v.id}
                name={v.id}
                color={v.color}
                offset={v.offset}
                viewportMsWidth={viewport.upper - viewport.lower}
              />
            )}
          </div>
        </div>

        { /*
            Timescale on the bottom
        */ }
        <Scale
          viewportLower={viewportLower}
          viewportUpper={viewportUpper}
          onChange={this.onTimescaleNavigate}
        />
      </div>
    );
  }
}

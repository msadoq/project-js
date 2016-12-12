import React, { Component, PropTypes } from 'react';
import { Glyphicon, Popover, OverlayTrigger, Form } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Controls.css';

const currentUpperMargin = 1 / 100;

export default class TimebarControlsLeft extends Component {

  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    slideWindow: PropTypes.object.isRequired,
    visuWindow: PropTypes.object.isRequired,
    timebarId: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarSpeed: PropTypes.number.isRequired,
    currentSessionOffsetMs: PropTypes.number,
  }

  changeSpeed = (dir) => {
    const {
      updateSpeed,
      timebarId,
      timebarSpeed,
      isPlaying,
      play,
    } = this.props;

    let newSpeed = dir === 'up' ? 2 * timebarSpeed : timebarSpeed / 2;

    if (timebarSpeed === 0.1 && dir === 'up') {
      newSpeed = 0.125;
    } else if (timebarSpeed === 10 && dir === 'down') {
      newSpeed = 8;
    }
    if (newSpeed > 10) {
      newSpeed = 10;
    }
    if (newSpeed < 0.1) {
      newSpeed = 0.1;
    }
    updateSpeed(timebarId, newSpeed);
    if (newSpeed !== 1 && !isPlaying) {
      play(timebarId);
    }
  }

  updatePlayingSpeed = (e) => {
    e.preventDefault();
    const {
      updateSpeed,
      timebarId,
    } = this.props;
    let newSpeed = parseFloat(this.speedInputEl.value) || 1;
    if (newSpeed < 0.1) {
      newSpeed = 0.1;
    } else if (newSpeed > 10) {
      newSpeed = 10;
    }
    updateSpeed(timebarId, newSpeed);
  }

  restoreWidth = (e) => {
    e.preventDefault();
    const {
      visuWindow,
      timebarMode,
      timebarId,
      updateCursors,
    } = this.props;

    const newSlideUpper = timebarMode === 'Extensible' ?
      visuWindow.current + (visuWindow.defaultWidth) :
      visuWindow.current + (visuWindow.defaultWidth / 4);

    updateCursors(
      timebarId,
      {
        lower: visuWindow.current - (visuWindow.defaultWidth / 2),
        upper: visuWindow.current + (visuWindow.defaultWidth / 2),
      },
      {
        lower: visuWindow.current - (visuWindow.defaultWidth / 4),
        upper: newSlideUpper,
      },
    );
  }

  goNow = (e) => {
    e.preventDefault();
    const { currentSessionOffsetMs, updateCursors, timebarId } = this.props;
    const { lower, upper } = this.props.visuWindow;
    const msWidth = upper - lower;
    const realTimeMs = Date.now() + currentSessionOffsetMs;
    const newLower = realTimeMs - ((1 - currentUpperMargin) * msWidth);
    const newUpper = realTimeMs + (currentUpperMargin * msWidth);
    updateCursors(
      timebarId,
      {
        lower: newLower,
        upper: newUpper,
        current: realTimeMs,
      },
      {
        lower: newLower,
        upper: newUpper,
      },
    );
  }

  jump = (e) => {
    e.preventDefault();
    const { updateCursors, timebarId, slideWindow } = this.props;
    const { lower, upper, current } = this.props.visuWindow;

    const movedMs = 1000 * e.currentTarget.getAttribute('offset');
    updateCursors(
      timebarId,
      {
        lower: lower + movedMs,
        upper: upper + movedMs,
        current: current + movedMs,
      },
      {
        lower: slideWindow.lower + movedMs,
        upper: slideWindow.upper + movedMs,
      },
    );
  }

  render() {
    const {
      timebarId,
      timebarSpeed,
      isPlaying,
      play,
      pause,
      toggleTimesetter,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    const speedPopover =
      (<Popover
        title="Playing speed"
        placement="top"
        id="playingSpeedPopover"
        style={{ width: '200px' }}
      >
        <Form horizontal>
          <input
            className={classnames(
              'form-control',
              styles.speedInputEl
            )}
            ref={(el) => { this.speedInputEl = el; }}
            type="number"
            step="0.1"
            min="0.1"
            defaultValue={timebarSpeed}
            max="10"
          />
          <input
            type="submit"
            value="save"
            className="btn btn-primary"
            onClick={this.updatePlayingSpeed}
          />
        </Form>
      </Popover>);

    return (
      <ul className={styles.controlsUl}>
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            onClick={this.changeSpeed.bind(null, 'down')}
            title="Decrease speed"
          >
            &#9668;&#9668;
          </button>
        </li>
        <li className={styles.controlsLi}>

          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={speedPopover}
            container={this}
          >
            <button
              className={classnames('btn', 'btn-xs', 'btn-default')}
            >
              {`${timebarSpeed}X`}
            </button>
          </OverlayTrigger>
        </li>
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            onClick={this.changeSpeed.bind(null, 'up')}
            title="Increase speed"
          >
            &#9658;&#9658;
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            className={classnames(
              allButtonsKlasses,
              {
                [styles.controlButtonPlay]: isPlaying,
                [styles.controlButtonActive]: isPlaying,
                [styles.controlButtonPause]: !isPlaying
              }
            )}
            onClick={() => (isPlaying ? pause() : play(timebarId))}
            title={isPlaying ? 'pause' : 'play'}
          >
            {isPlaying ? <span>&#9613;&#9613;</span> : <span>&#9658;</span>}
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            offset={-10}
            className={allButtonsKlasses}
            onClick={this.jump}
            title="- 10s"
          >
            - 10s
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            offset={10}
            className={allButtonsKlasses}
            onClick={this.jump}
            title="+ 10s"
          >
            + 10s
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            onClick={this.goNow}
            title="Go now"
          >
            NOW
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            onClick={this.restoreWidth}
            title="Restore visu window's default width"
          >
            _
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            onClick={() => toggleTimesetter()}
            title="Display time setter"
          >
            <Glyphicon glyph="align-justify" />
          </button>
        </li>
      </ul>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TimebarControls.css';

export default class TimebarControlsLeft extends Component {

  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    slideWindow: PropTypes.object.isRequired,
    visuWindow: PropTypes.object.isRequired,
    timebarId: PropTypes.string.isRequired,
    timebarSpeed: PropTypes.number.isRequired,
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
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

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
          <button
            className={classnames('btn', 'btn-xs', 'btn-default')}
          >
            {`${timebarSpeed}X`}
          </button>
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
            title={isPlaying ? 'play' : 'pause'}
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
      </ul>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import {
  Glyphicon,
  Popover,
  OverlayTrigger,
  Form,
} from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Controls.css';

export default class ControlsLeft extends PureComponent {

  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    restoreWidth: PropTypes.func.isRequired,
    goNow: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    messages: PropTypes.array,
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
    const { timebarId, restoreWidth } = this.props;
    restoreWidth(timebarId);
  }

  goNow = (e) => {
    e.preventDefault();
    const { timebarId, goNow } = this.props;
    goNow(timebarId);
  }

  jump = (e) => {
    e.preventDefault();
    const { jump, timebarId } = this.props;
    jump(
      timebarId,
      1000 * e.currentTarget.getAttribute('offset')
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
      messages,
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
        {(messages && messages.length) ?
          <li className={styles.controlsLi}>
            <button
              className={classnames('btn', 'btn-xs', 'btn-danger')}
              onClick={() => toggleTimesetter()}
              title="Display time setter"
              style={{ fontSize: '1.1em' }}
            >
              { messages.length }
            </button>
          </li>
          : ''
        }
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            onClick={this.changeSpeed.bind(null, 'down')}
            title="Decrease speed"
          >
            <Glyphicon className={styles.glyphIcon} glyph="backward" />
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
            <Glyphicon className={styles.glyphIcon} glyph="forward" />
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
            {isPlaying ?
              <Glyphicon className={styles.glyphIcon} glyph="pause" /> :
              <Glyphicon className={styles.glyphIcon} glyph="play" />
            }
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

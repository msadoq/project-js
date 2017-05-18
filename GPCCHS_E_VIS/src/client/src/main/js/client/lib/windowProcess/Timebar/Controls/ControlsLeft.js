import React, { PureComponent, PropTypes } from 'react';
import {
  Glyphicon,
  Popover,
  OverlayTrigger,
  Form,
  Tooltip,
} from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Controls.css';
import { main } from '../../ipc';

const inlineStyles = {
  width200: { width: '200px' },
};

const OverlayTriggerTrigger = ['hover', 'focus'];

export default class ControlsLeft extends PureComponent {

  static propTypes = {
    sessionId: PropTypes.number,
    isPlaying: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    restoreWidth: PropTypes.func.isRequired,
    goNow: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    timebarUuid: PropTypes.string.isRequired,
    timebarSpeed: PropTypes.number.isRequired,
  }

  static defaultProps = {
    masterTimeline: null,
    messages: [],
    sessionId: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  changeSpeed = (e) => {
    e.preventDefault();
    const {
      updateSpeed,
      timebarUuid,
      timebarSpeed,
      isPlaying,
      play,
    } = this.props;
    const dir = e.currentTarget.getAttribute('direction');

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
    updateSpeed(timebarUuid, newSpeed);
    if (newSpeed !== 1 && !isPlaying) {
      play(timebarUuid);
    }
  }

  updatePlayingSpeed = (e) => {
    e.preventDefault();
    const {
      updateSpeed,
      timebarUuid,
    } = this.props;
    let newSpeed = parseFloat(this.speedInputEl.value) || 1;
    if (newSpeed < 0.1) {
      newSpeed = 0.1;
    } else if (newSpeed > 10) {
      newSpeed = 10;
    }
    updateSpeed(timebarUuid, newSpeed);
  }

  restoreWidth = (e) => {
    e.preventDefault();
    const { timebarUuid, restoreWidth } = this.props;
    restoreWidth(timebarUuid);
  }

  goNow = (e) => {
    e.preventDefault();
    const {
      timebarUuid,
      goNow,
      sessionId,
    } = this.props;
    // IPC request to get master session current time
    main.getSessionTime(sessionId, ({ err, timestamp }) => {
      if (err) {
        // TODO Show message
        return;
      }
      goNow(timebarUuid, timestamp);
    });
  }

  jump = (e) => {
    e.preventDefault();
    const { jump, timebarUuid } = this.props;
    jump(
      timebarUuid,
      1000 * e.currentTarget.getAttribute('offset')
    );
  }

  willOpenModal = (e) => {
    e.preventDefault();
    const {
      openModal,
      timebarUuid,
    } = this.props;
    openModal(
      this.context.windowId,
      {
        type: 'timeSetter',
        timebarUuid,
        cursor: 'all',
      }
    );
  }

  render() {
    const {
      timebarUuid,
      timebarSpeed,
      isPlaying,
      play,
      pause,
      messages,
      sessionId,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');
    const nowDisabled = sessionId === null;
    const disabledTooltip = (
      <Tooltip
        id="RTTooltip"
        style={inlineStyles.width200}
      >
        <b>Cannot go now</b><br />
         No master timeline<br />
      </Tooltip>
    );
    const speedPopover =
      (<Popover
        title="Playing speed"
        placement="top"
        id="playingSpeedPopover"
        style={inlineStyles.width200}
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
              onClick={this.willOpenModal}
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
            direction="down"
            onClick={this.changeSpeed}
            title="Decrease speed"
          >
            <Glyphicon className={styles.glyphIcon} glyph="backward" />
          </button>
        </li>
        <li className={styles.controlsLi}>

          <OverlayTrigger
            placement="top"
            trigger="click"
            rootClose
            overlay={speedPopover}
            container={this}
          >
            <button
              className={classnames('btn', 'btn-xs', 'btn-default')}
              title="Timebar playing speed"
            >
              {`${timebarSpeed}X`}
            </button>
          </OverlayTrigger>
        </li>
        <li className={styles.controlsLi}>
          <button
            className={allButtonsKlasses}
            direction="up"
            onClick={this.changeSpeed}
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
                [styles.controlButtonPause]: !isPlaying,
              }
            )}
            onClick={() => (isPlaying ? pause() : play(timebarUuid))}
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
          { nowDisabled && <OverlayTrigger
            trigger={OverlayTriggerTrigger}
            placement="top"
            overlay={disabledTooltip}
            container={this}
          >
            <span
              className={classnames(
                allButtonsKlasses,
                styles.controlButtonDisabled
              )}
            >
              Now
            </span>
          </OverlayTrigger> }
          { !nowDisabled && <button
            className={allButtonsKlasses}
            onClick={this.goNow}
            title="Go now"
          >
            NOW
          </button> }
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
            onClick={this.willOpenModal}
            title="Display time setter"
          >
            <Glyphicon glyph="align-justify" />
          </button>
        </li>
      </ul>
    );
  }
}

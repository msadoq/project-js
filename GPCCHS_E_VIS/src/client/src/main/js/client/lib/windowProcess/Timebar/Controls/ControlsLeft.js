// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Fix / refacto and test timebar controls components
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : fix lint warnings about proptypes in timebar controls
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Use getCurrentSessionExists selector in ControlsContainer
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Added theme variables linked to main areas.
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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

const inlineStyles = {
  width200: { width: '200px' },
};

const OverlayTriggerTrigger = ['hover', 'focus'];

export default class ControlsLeft extends PureComponent {

  static propTypes = {
    enableRealTime: PropTypes.bool.isRequired,
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
    } = this.props;
    goNow(timebarUuid);
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
      enableRealTime,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');
    const nowDisabled = !enableRealTime;
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
      <ul className={classnames(styles.controlsUl, styles.controlsUlLeft)}>
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
                active: isPlaying,
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

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Styling and adding play / pause button to collapsed timebar.
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : When clicking on explorer shortcuts, explorer auto-expands if it is not expanded.
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';
import styles from './TimebarCollapsed.css';

export default class TimebarCollapsed extends PureComponent {

  static propTypes = {
    minimizeTimebar: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
  }

  willPause = (e) => {
    e.preventDefault();
    this.props.pause();
  }

  willPlay = (e) => {
    e.preventDefault();
    this.props.play(this.props.timebarUuid);
  }

  minimize = (e) => {
    e.preventDefault();
    this.props.minimizeTimebar(this.props.pageId, false);
  }

  render() {
    const {
      isPlaying,
      current,
    } = this.props;

    return (
      <div
        className={styles.timebarWrapperCollapsed}
      >
        <span
          className={styles.timestamp}
        >{moment(current).format('YYYY[-]MM[-]DD HH[:]mm[:]ss[.]SSS')}
        </span>
        <button
          className={classnames('pull-right', 'btn', 'btn-sm', 'btn-control')}
          onClick={this.minimize}
          title="Expand timebar"
        >
          <span className={styles.expand}>&#9633;</span>
        </button>
        {
          isPlaying ?
            <button
              className={classnames('pull-right', 'btn', 'btn-sm', 'btn-control', styles.playing)}
              onClick={this.willPause}
              title="pause"
            >
              <Glyphicon glyph="pause" />
            </button>
          :
            <button
              className={classnames('pull-right', 'btn', 'btn-sm', 'btn-control')}
              onClick={this.willPlay}
              title="play"
            >
              <Glyphicon glyph="play" />
            </button>
        }
      </div>
    );
  }
}

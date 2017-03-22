import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Glyphicon } from 'react-bootstrap';
import styles from './TimebarCollapsed.css';

export default class TimebarWrapper extends PureComponent {

  static propTypes = {
    willCollapse: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    timebarUuid: PropTypes.string.isRequired,
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


  render() {
    const {
      isPlaying,
      current,
      willCollapse,
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
          onClick={willCollapse}
          title="Expand timebar"
        >
          <Glyphicon glyph="resize-full" />
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

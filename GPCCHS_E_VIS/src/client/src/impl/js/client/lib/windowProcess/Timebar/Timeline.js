import React, { Component } from 'react';
import styles from './Lefttab.css';

export default class Timeline extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
  }

  willUnmountTimeline = () => {
    this.props.unmountTimeline(this.props.timebarId, this.props.id);
  }

  render() {
    return (
      <li className={styles.timeline} >
        {this.props.name}
        <span
          className={styles.square}
          style={{ background: (this.props.color ? `hsl(${this.props.color})` : '#31b0d5') }}>
        </span>
        <span className={styles.deleteButton} title="Remove this track" onClick={this.willUnmountTimeline}>-</span>
      </li>
    );
  }
}

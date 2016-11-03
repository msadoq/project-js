import React, { Component } from 'react';
import styles from './Lefttab.css';

export default class Timeline extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
  }

  willUnmountTimeline = (e) => {
    this.props.unmountTimeline(this.props.timebarId, this.props.id);
  }

  render() {
    console.log(this.props);
    return (
      <li
        className={styles.timeline}
        style={{ background: (this.props.color ? `hsl(${this.props.color})` : '#31b0d5') }}
      >
        {this.props.name}
        <span className={styles.deleteButton} onClick={this.willUnmountTimeline}>-</span>
      </li>
    );
  }
}

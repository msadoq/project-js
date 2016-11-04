import React, { PureComponent } from 'react';
import styles from './Lefttab.css';

export default class Timeline extends PureComponent {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
    color: React.PropTypes.string
  }

  willUnmountTimeline = (e) => {
    e.preventDefault();
    this.props.unmountTimeline(this.props.timebarId, this.props.id);
  }

  render() {
    const { color, name } = this.props;
    return (
      <li className={styles.timeline}>
        {name}
        <span
          className={styles.square}
          style={{
            background: color || '#31b0d5'
          }}
        />
        <button className={styles.deleteButton} title="Remove this track" onClick={this.willUnmountTimeline}>-</button>
      </li>
    );
  }
}

import React from 'react';
import AddEntryPoint from './AddEntryPoint';
import EntryPointDetails from './EntryPointDetails';
import styles from './EntryPointTree.css';

export default class EntryPointTree extends React.Component {
  static propTypes = {
    entryPoints: React.PropTypes.array
  }
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    let EntryPointsName = this.props.entryPoints.map(entryPoint =>
      <EntryPointDetails key={entryPoint.name} entryPoint={entryPoint} />
    );
    return (
      <div className={styles.entryPointsTree}>
        {EntryPointsName}
        <AddEntryPoint />
      </div>
    );
  }
}

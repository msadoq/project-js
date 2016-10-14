import React from 'react';
import EntryPointDetails from './EntryPointDetails';
import styles from './EntryPointTree.css';

/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends React.Component {
  static propTypes = {
    entryPoints: React.PropTypes.array,
    search: React.PropTypes.string,
    handleEntryPoint: React.PropTypes.func,
    remove: React.PropTypes.func
  }
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    const mask = `${this.props.search}.*`;
    const EntryPointsName = (this.props.entryPoints && this.props.entryPoints.length > 0) ?
      this.props.entryPoints.map((entryPoint, key_) =>
        ((entryPoint.name.match(mask)) ?
          <EntryPointDetails
            key={key_}
            idPoint={key_}
            entryPoint={entryPoint}
            handleEntryPoint={this.props.handleEntryPoint}
            remove={this.props.remove}
          /> :
          null
        )
      ) :
        <div>No entryPoints to display</div>;
    return (
      <div className={styles.entryPointsTree}>
        {EntryPointsName}
      </div>
    );
  }
}

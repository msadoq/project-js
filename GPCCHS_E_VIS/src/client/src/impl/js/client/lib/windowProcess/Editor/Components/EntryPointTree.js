import React, { PropTypes } from 'react';
import EntryPointDetails from './EntryPointDetails';
import styles from './EntryPointTree.css';

/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends React.Component {
  static propTypes = {
    entryPoints: PropTypes.array,
    search: PropTypes.string,
    handleEntryPoint: PropTypes.func,
    remove: PropTypes.func
  }

  static defaultProps = {
    entryPoints: []
  };

  state = {};

  render() {
    const mask = `${this.props.search}.*`;
    const { entryPoints, handleEntryPoint, remove } = this.props;

    return (
      <div className={styles.entryPointsTree}>
        {entryPoints.length && entryPoints.map((entryPoint, key_) =>
        ((entryPoint.name.match(mask))
          ? <EntryPointDetails
            key={key_}
            idPoint={key_}
            entryPoint={entryPoint}
            handleEntryPoint={handleEntryPoint}
            remove={remove}
          />
          : null
        ))}
        {!entryPoints.length && <div>No entryPoints to display</div>}
      </div>
    );
  }
}

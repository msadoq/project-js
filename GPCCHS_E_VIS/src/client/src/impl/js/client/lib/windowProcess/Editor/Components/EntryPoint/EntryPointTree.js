import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Glyphicon
} from 'react-bootstrap';

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

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  openPanel = key => this.setState({ [`panel${key}IsOpen`]: true });
  closePanel = key => this.setState({ [`panel${key}IsOpen`]: false });

  render() {
    const mask = `${this.props.search}.*`;
    const { entryPoints, handleEntryPoint } = this.props;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.match(mask));

    if (!entryPoints.length) {
      return (<div>No entryPoints to display</div>);
    }

    return (
      <Accordion className={styles.entryPointsTree}>
        {list.map((entryPoint, key) => {
          const isOpen = this.state[`panel${key}IsOpen`];
          return (
            <Panel
              key={key}
              header={<span>
                {entryPoint.name}
                <button
                  className="pull-right btn-link"
                  onClick={e => this.handleRemove(e, key)}
                >
                  <Glyphicon
                    className={styles.danger}
                    glyph="remove"
                    title="Remove"
                  />
                </button>
              </span>}
              eventKey={key}
              expanded={isOpen}
              onSelect={this.openPanel.bind(key)}
              onExited={this.closePanel.bind(key)}
            >
              {isOpen && <EntryPointDetails
                key={key + entryPoint.name}
                idPoint={key}
                entryPoint={entryPoint}
                handleEntryPoint={handleEntryPoint}
              />}
            </Panel>
          );
        })}
      </Accordion>
    );
  }
}

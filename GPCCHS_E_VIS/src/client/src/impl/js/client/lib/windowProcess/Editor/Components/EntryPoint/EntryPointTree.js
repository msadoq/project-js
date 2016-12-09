import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Glyphicon,
  Alert,
  Button
} from 'react-bootstrap';

import {
  EntryPointDetailsContainer
} from './';
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

  static contextTypes = {
    viewId: React.PropTypes.string,
    focusedPageId: React.PropTypes.string,
  }

  state = {};

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  openPanel = key => this.setState({ [`panel${key}IsOpen`]: true });
  closePanel = key => this.setState({ [`panel${key}IsOpen`]: false });

  render() {
    const { viewId, focusedPageId } = this.context;
    const mask = `${this.props.search}.*`;
    const { entryPoints, handleEntryPoint } = this.props;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.match(mask));

    if (!list.length) {
      return (<Alert bsStyle="info" className="m0">
        <strong>Holy guacamole!</strong> Nothing to display.
      </Alert>);
    }

    return (
      <Accordion>
        {list.map((entryPoint, key) => {
          const isOpen = this.state[`panel${key}IsOpen`];
          return (
            <Panel
              key={key}
              header={<span>
                {entryPoint.objectStyle && entryPoint.objectStyle.curveColor && <div
                  style={{
                    height: '20px',
                    width: '20px',
                    marginRight: '10px',
                    backgroundColor: entryPoint.objectStyle.curveColor
                  }}
                />}
                <span className="flex">{entryPoint.name}</span>
                <Button
                  bsSize="xsmall"
                  className="btn-link"
                  onClick={e => this.handleRemove(e, key)}
                >
                  <Glyphicon
                    className="text-danger"
                    glyph="remove"
                    title="Remove"
                  />
                </Button>
              </span>}
              eventKey={key}
              expanded={isOpen}
              onSelect={this.openPanel.bind(key)}
              onExited={this.closePanel.bind(key)}
            >
              {isOpen && <EntryPointDetailsContainer
                key={key}
                idPoint={key}
                viewId={viewId}
                focusedPageId={focusedPageId}
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

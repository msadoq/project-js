import React, { PropTypes } from 'react';
import _memoize from 'lodash/memoize';
import {
  Accordion,
  Panel,
  Glyphicon,
  Alert,
  Button,
} from 'react-bootstrap';

import EntryPointDetailsContainer from './EntryPointDetailsContainer';
/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends React.Component {
  static propTypes = {
    entryPoints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      connectedData: PropTypes.shape({
        digits: PropTypes.number,
        domain: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
        format: PropTypes.string,
        formula: PropTypes.string,
        timeline: PropTypes.string,
        unit: PropTypes.string,
      }),
    })),
    search: PropTypes.string,
    remove: PropTypes.func.isRequired,
  }

  static defaultProps = {
    entryPoints: [],
    search: '',
  };

  static contextTypes = {
    viewId: React.PropTypes.string,
    windowId: React.PropTypes.string,
  }

  state = {};

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  openPanel = _memoize(key => () => this.setState({ [`panel${key}IsOpen`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`panel${key}IsOpen`]: false }));

  render() {
    const { viewId, windowId } = this.context;
    const mask = `${this.props.search || ''}.*`;
    const { entryPoints } = this.props;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.toLowerCase().match(mask.toLowerCase()));

    if (!list.length) {
      return (<Alert bsStyle="info" className="m0">
        Nothing to display.
      </Alert>);
    }

    return (
      <Accordion>
        {list.map((entryPoint, key) => {
          const isOpen = this.state[`panel${key}IsOpen`];
          return (
            <Panel
              key={entryPoint.id}
              header={<span>
                {entryPoint.objectStyle && entryPoint.objectStyle.curveColor && <div
                  style={{
                    height: '20px',
                    width: '20px',
                    marginRight: '10px',
                    backgroundColor: entryPoint.objectStyle.curveColor,
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
              onSelect={this.openPanel(key)}
              onExited={this.closePanel(key)}
            >
              {isOpen && <EntryPointDetailsContainer
                key={`${entryPoint.name}#detailsContainer`}
                idPoint={key}
                viewId={viewId}
                windowId={windowId}
                entryPoint={entryPoint}
              />}
            </Panel>
          );
        })}
      </Accordion>
    );
  }
}

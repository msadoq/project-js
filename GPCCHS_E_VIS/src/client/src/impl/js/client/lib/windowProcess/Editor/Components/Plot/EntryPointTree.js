import React, { PropTypes, PureComponent } from 'react';
import {
  Accordion,
  Panel,
  Glyphicon,
  Alert,
  Button
} from 'react-bootstrap';
import _memoize from 'lodash/memoize';

import EntryPointDetailsContainer from './EntryPointDetailsContainer';
/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends PureComponent {
  static propTypes = {
    entryPoints: PropTypes.array,
    search: PropTypes.string,
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

  openPanel = _memoize(key => () => this.setState({ [`panel${key}IsOpen`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`panel${key}IsOpen`]: false }));

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  render() {
    const { viewId, focusedPageId } = this.context;
    const mask = `${this.props.search}.*`;
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
              onSelect={this.openPanel(key)}
              onExited={this.closePanel(key)}
            >
              {isOpen && <EntryPointDetailsContainer
                key={key}
                idPoint={key}
                viewId={viewId}
                focusedPageId={focusedPageId}
                entryPoint={entryPoint}
              />}
            </Panel>
          );
        })}
      </Accordion>
    );
  }
}

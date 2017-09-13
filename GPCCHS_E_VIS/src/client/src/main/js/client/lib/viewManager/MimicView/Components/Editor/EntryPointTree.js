import React, { PropTypes } from 'react';
import Collapse from 'rc-collapse';
import classnames from 'classnames';
import {
  Glyphicon,
  Alert,
  Button,
} from 'react-bootstrap';
import styles from './EntryPointTree.css';
import EntryPointDetailsContainer from './EntryPointDetailsContainer';

const { Panel } = Collapse;
const emptyArray = [];

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
    search: PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    entryPointsPanels: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    entryPoints: [],
  };

  static contextTypes = {
    viewId: React.PropTypes.string,
    windowId: React.PropTypes.string,
  }

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'entryPoints', openPanels);
  }

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  }

  render() {
    const { windowId } = this.context;
    const mask = `${this.props.search}.*`;
    const { entryPoints, viewId, entryPointsPanels } = this.props;
    const list = entryPoints
      .filter(entryPoint => entryPoint.name.toLowerCase().match(mask.toLowerCase()));

    if (!list.length) {
      return (<Alert bsStyle="info" className="m0">
        Nothing to display.
      </Alert>);
    }

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={entryPointsPanels === true ? emptyArray : Object.keys(entryPointsPanels)}
      >
        {list.map((entryPoint, key) => {
          const isOpen = entryPointsPanels[entryPoint.id];
          return (
            <Panel
              key={entryPoint.id}
              header={
                <div className={classnames('rc-collapse-header-inner', styles.collapseHeader)}>
                  <span className="flex">{entryPoint.name}</span>
                  <div>
                    <Button
                      bsSize="xsmall"
                      className={classnames('btn-link', styles.removeButton)}
                      onClick={e => this.handleRemove(e, key)}
                    >
                      <Glyphicon
                        className="text-danger"
                        glyph="remove"
                        title="Remove"
                      />
                    </Button>
                  </div>
                </div>
              }
            >
              {isOpen && <EntryPointDetailsContainer
                key={`${entryPoint.id}#detailsContainer`}
                viewId={viewId}
                windowId={windowId}
                entryPoint={entryPoint}
              />}
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

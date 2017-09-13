import React, { PropTypes, Component } from 'react';
import {
  Glyphicon,
  Alert,
  Button,
} from 'react-bootstrap';
import Collapse, { Panel } from 'rc-collapse';
import classnames from 'classnames';
import EntryPointDetailsContainer from './EntryPointDetailsContainer';
import styles from './EntryPointTree.css';

const emptyArray = [];

/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends Component {
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
    viewId: PropTypes.string.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    entryPointsPanels: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    entryPoints: [],
    search: '',
  };

  static contextTypes = {
    windowId: React.PropTypes.string,
  }

  state = { openPanels: [] };

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
    const {
      entryPoints,
      viewId,
      entryPointsPanels,
    } = this.props;

    const mask = `${this.props.search || ''}.*`;
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
                <div className="rc-collapse-header-inner">
                  {entryPoint.objectStyle && entryPoint.objectStyle.curveColor &&
                    <div
                      className={styles.colorSquare}
                      style={{
                        backgroundColor: entryPoint.objectStyle.curveColor,
                      }}
                    />
                  }
                  <span className="flex">&nbsp;&nbsp;&nbsp;{entryPoint.name}</span>
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

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 10/07/2017 : MimicView editor rc-collapse implementation + fixes on Plot and Text editors too.
// VERSION : 1.1.2 : FA : #7773 : 13/09/2017 : Fixed bug when editing PlotView/TextView/MimicView EntryPoint's name.
// END-HISTORY
// ====================================================================

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

const { arrayOf, string, number, shape, func } = PropTypes;

export default class EntryPointTree extends Component {
  static propTypes = {
    entryPoints: arrayOf(shape({
      id: string,
      name: string,
      connectedData: shape({
        digits: number,
        domain: string,
        filter: arrayOf(shape({
          field: string,
          operand: string,
          operator: string,
        })),
        format: string,
        formula: string,
        timeline: string,
        unit: string,
      }),
    })),
    search: string,
    remove: func.isRequired,
    viewId: string.isRequired,
    updateViewPanels: func.isRequired,
    entryPointsPanels: shape({}).isRequired,
  };

  static defaultProps = {
    entryPoints: [],
    search: '',
  };

  state = { openPanels: [] };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'entryPoints', openPanels);
  };

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.remove(key);
  };

  render() {
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
        {list.map((entryPoint) => {
          const isOpen = entryPointsPanels[entryPoint.id];
          return (
            <Panel
              key={entryPoint.id}
              header={
                <div className={classnames('rc-collapse-header-inner', styles.collapseHeader)}>
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
                      onClick={e => this.handleRemove(e, entryPoint.id)}
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
                entryPoint={entryPoint}
              />}
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

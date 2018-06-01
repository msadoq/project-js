// ====================================================================
// HISTORY
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  TextView common components to dedicated folder
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Glyphicon,
  Alert,
  Button,
} from 'react-bootstrap';
import Collapse, { Panel } from 'rc-collapse';
import classnames from 'classnames';
import { handleSubmit } from 'viewManager/common';
import EntryPointDetailsContainer from './EntryPointDetailsContainer';
import styles from './EntryPointTree.css';
import { entryPointType } from '../types';

const emptyArray = [];

/*
  EntryPointTree liste les EntryPoints à afficher.
  Permet également d'appliquer un filtre sur le nom
*/

export default class EntryPointTree extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    search: PropTypes.string,
    entryPoints: PropTypes.arrayOf(entryPointType),
    // from container mapDispatchToProps
    askRemoveEntryPoint: PropTypes.func.isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    updateViewPanels: PropTypes.func.isRequired,
    // from container mapStateToProps
    entryPointsPanels: PropTypes.shape({}).isRequired,
    entryPointConnectedDataForm: PropTypes.func.isRequired,
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

  getEntryPointByKey(key) {
    const entryPoints = this.props.entryPoints;
    return entryPoints.find(ep => ep.id === key);
  }

  handleRemove = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.askRemoveEntryPoint(this.props.viewId, this.getEntryPointByKey(key));
  };

  handleSubmit = (submittedValues) => {
    const { updateEntryPoint, viewId } = this.props;
    handleSubmit(submittedValues, updateEntryPoint, viewId);
  };

  render() {
    const {
      entryPoints,
      pageId,
      viewId,
      entryPointsPanels,
      entryPointConnectedDataForm,
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
                pageId={pageId}
                entryPoint={entryPoint}
                onSubmit={this.handleSubmit}
                initialValues={entryPoint}
                form={`entrypoint-title-form-${entryPoint.id}-${viewId}`}
                entryPointConnectedDataForm={entryPointConnectedDataForm}
              />}
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

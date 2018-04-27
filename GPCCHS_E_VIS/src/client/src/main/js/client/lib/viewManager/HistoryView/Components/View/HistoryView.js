/* eslint-disable no-unused-vars,quote-props,react/prefer-stateless-function */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import __ from 'lodash/fp';

import DroppableContainer from 'windowProcess/common/DroppableContainer';

import './HistoryView.scss';

import { buildFormulaForAutocomplete } from '../../../common';
import NTableViewContainer from '../../../common/Components/View/NTableView/NTableViewContainer';

const getComObject = __.propOr('UNKNOWN_COM_OBJECT', 0);

// parse clipboard data to create partial entry point
function parseDragData(data) {
  const formula =
    buildFormulaForAutocomplete(
      data.catalogName,
      data.item,
      getComObject(data.comObjects),
      data.comObjectFields
    );

  return {
    name: 'HistoryViewEP',
    connectedData: {
      formula,
      domain: '*',
      timeline: '*',
    },
  };
}

class HistoryView extends React.Component {
  static propTypes = {
// eslint-disable-next-line react/no-unused-prop-types
    config: PropTypes.shape().isRequired,
    openEditor: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    askUnit: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { askUnit, config } = nextProps;
    const { entryPoints } = config;

    entryPoints.forEach((entryPoint) => {
      const {
        domain,
        sessionId,
        catalog,
        catalogItem,
      } = entryPoint;

      if (
        domain !== null &&
        sessionId !== null &&
        catalog !== null &&
        catalogItem !== null
      ) {
        askUnit(domain, sessionId, catalog, catalogItem);
      }
    });
  }

  onDrop = this.drop.bind(this);

  drop(ev) {
    const {
      addEntryPoint,
      openEditor,
    } = this.props;

    const data = ev.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    if (!_.get(content, 'catalogName')) {
      return;
    }

    const parsedData = parseDragData(content);
    addEntryPoint(parsedData);
    openEditor();

    ev.stopPropagation();
  }

  render() {
    console.log(this.props);
    return (
      <DroppableContainer
        className={'HistoryView'}
        onDrop={this.onDrop}
        ref={(node) => {
          this.container = node;
        }}
      >
        <NTableViewContainer
          {...this.props}
          tableId={0}
          config={this.props.config.tables[0]}
          container={this.container}
        />
      </DroppableContainer>
    );
  }
}

export default HistoryView;

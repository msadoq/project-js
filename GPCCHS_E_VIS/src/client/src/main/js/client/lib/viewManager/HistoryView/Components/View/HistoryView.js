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
import NTableView from '../../../common/Components/View/NTableView/NTableView';

import './HistoryView.scss';

import { buildFormulaForAutocomplete } from '../../../common';

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
    openEditor: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
  };

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

    try {
      const parsedData = parseDragData(content);
      addEntryPoint(parsedData);
      // openEditor();
    } catch (err) {
      console.error('[ERR message] = ', err);
    }
    ev.stopPropagation();
  }

  render() {
    return (
      <DroppableContainer onDrop={this.onDrop}>
        <NTableView
          className={'HistoryView'}
          {...this.props}
        />
      </DroppableContainer>
    );
  }
}

export default HistoryView;

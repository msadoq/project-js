/* eslint-disable no-unused-vars,quote-props,react/prefer-stateless-function */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Optimize HistoryView render . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Use withBatchedSetState hoc in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Remove labels from props.data in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Create first basic table for HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Move common/Dimensions.js in
//  common/hoc/withDimensions .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add read only scrollbar in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add onScrollUp and onScrollDown event to HistoryView
//  component
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : HistoryView work with real data .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Improve HistoryView React key .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add withMouseWheelEvents hoc in windowProcess
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Refacto onWheel method in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add rowHeight prop to HistoryView component
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add selected current to HistoryView
// VERSION : 2.0.0 : DM : #6127 : 26/09/2017 : Use light theme on HistoryView
// VERSION : 2.0.0 : DM : #6127 : 26/09/2017 : Fix scrolling bug in HistoryView when resize the
//  view or visuWindow
// VERSION : 2.0.0 : DM : #5806 : 03/10/2017 : Remove useless ref in HistoryView component
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
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

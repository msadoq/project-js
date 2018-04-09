/* eslint-disable no-unused-vars,quote-props,react/prefer-stateless-function */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import React from 'react';

import NTableView from '../../../common/Components/View/NTableView/NTableView';

import './HistoryView.scss';

class HistoryView extends React.Component {
  render() {
    return (
      <NTableView
        className={'HistoryView'}
        {...this.props}
      />
    );
  }
}

export default HistoryView;

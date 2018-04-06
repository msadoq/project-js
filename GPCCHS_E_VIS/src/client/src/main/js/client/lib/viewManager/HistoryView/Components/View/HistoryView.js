/* eslint-disable no-unused-vars,quote-props */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';

import HistoryTable from './HistoryTable/HistoryTable';


class HistoryView extends React.Component {
  static propTypes = {
    data: PropTypes.shape(),
    actions: PropTypes.shape(),
  };

  static defaultProps = {
    data: {},
    actions: {},
  };

  render() {
    const { data, actions } = this.props;

    return (
      <HistoryTable data={data} actions={actions} />
    );
  }
}

export default HistoryView;

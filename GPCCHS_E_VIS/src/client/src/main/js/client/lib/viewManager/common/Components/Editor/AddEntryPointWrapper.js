// ====================================================================
// HISTORY
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // jest common
//  components
// VERSION : 2.0.0 : FA : #9494 : 01/12/2017 : Regression in View Editor ( domain ) // move
//  TextView common components to dedicated folder
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddEntryPoint from './AddEntryPoint';

const initialValues = { name: '' };
const { string, func } = PropTypes;

export default class AddEntryPointWrapper extends Component {
  static propTypes = {
    viewId: string.isRequired,
    closeModal: func.isRequired,
    addEntryPoint: func.isRequired,
  };

  willAddEntryPoint = (values) => {
    const {
      addEntryPoint,
      closeModal,
      viewId,
    } = this.props;
    addEntryPoint(viewId, values);
    closeModal();
  };

  render() {
    return (
      <AddEntryPoint
        onSubmit={this.willAddEntryPoint}
        form="new-entrypoint-parameters-form"
        initialValues={initialValues}
      />
    );
  }
}

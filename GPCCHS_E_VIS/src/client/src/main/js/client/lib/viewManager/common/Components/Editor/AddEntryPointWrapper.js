// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView. Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y axis.
// END-HISTORY
// ====================================================================

import React, { PropTypes, Component } from 'react';
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

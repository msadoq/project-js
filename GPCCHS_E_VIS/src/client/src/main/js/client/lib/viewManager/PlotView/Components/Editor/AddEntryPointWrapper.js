// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView. Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y axis.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// END-HISTORY
// ====================================================================

import React, { PropTypes, Component } from 'react';
import AddEntryPoint from './AddEntryPoint';

const initialValues = { name: '', unit: '', axisId: '' };

export default class AddEntryPointWrapper extends Component {

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
    axes: PropTypes.shape({}).isRequired,
  };

  willAddEntryPoint = (values) => {
    const {
      addEntryPoint,
      closeModal,
      viewId,
    } = this.props;
    addEntryPoint(viewId, values);
    closeModal();
  }

  render() {
    return (
      <AddEntryPoint
        onSubmit={this.willAddEntryPoint}
        axes={this.props.axes}
        form="new-entrypoint-parameters-form"
        initialValues={initialValues}
      />
    );
  }
}

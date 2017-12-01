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

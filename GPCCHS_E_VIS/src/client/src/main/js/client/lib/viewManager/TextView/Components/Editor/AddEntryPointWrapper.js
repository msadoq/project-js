import React, { PropTypes, Component } from 'react';
import AddEntryPoint from './AddEntryPoint';

const initialValues = { name: '' };

export default class AddEntryPointWrapper extends Component {

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    addEntryPoint: PropTypes.func.isRequired,
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
        form="new-entrypoint-parameters-form"
        initialValues={initialValues}
      />
    );
  }
}

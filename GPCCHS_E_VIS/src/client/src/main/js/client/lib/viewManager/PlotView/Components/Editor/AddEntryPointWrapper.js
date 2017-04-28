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
    console.log('will add EP', values);
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import AddPlotConstant from './AddPlotConstant';

const initialValues = {
  label: '',
  value: '',
  style: {
    color: '#000000',
  },
  showConstant: true,
  showLabel: true,
};

export default class AddConstantWrapper extends Component {

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    addConstant: PropTypes.func.isRequired,
    axes: PropTypes.shape({}).isRequired,
  };

  willAddConstant = (values) => {
    const {
      addConstant,
      closeModal,
      viewId,
    } = this.props;
    addConstant(
      viewId,
      { ...values }
    );
    closeModal();
  };

  render() {
    return (
      <ErrorBoundary>
        <AddPlotConstant
          onSubmit={this.willAddConstant}
          axes={this.props.axes}
          form={`add-plot-constant-${this.props.viewId}`}
          initialValues={initialValues}
        />
      </ErrorBoundary>
    );
  }
}

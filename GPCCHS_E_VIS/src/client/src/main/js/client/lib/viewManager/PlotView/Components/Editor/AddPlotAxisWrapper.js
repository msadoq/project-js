import React, { PropTypes, Component } from 'react';
import AddPlotAxis from './AddPlotAxis';

const initialValues = {
  label: '',
  unit: '',
  min: '0',
  max: '0',
  autoLimits: true,
  tickStep: '1',
  autoTick: true,
  showTicks: true,
  isLogarithmic: false,
  showAxis: true,
  style: {
    font: 'Arial',
    size: 12,
    bold: false,
    italic: false,
    underline: false,
    strikeOut: false,
    align: 'left',
    color: '#000000',
  },
};

export default class AddEntryPointWrapper extends Component {

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    addAxis: PropTypes.func.isRequired,
    axes: PropTypes.shape({}).isRequired,
  };

  willAddAxis = (values) => {
    const {
      addAxis,
      closeModal,
      viewId,
    } = this.props;
    addAxis(
      viewId,
      {
        ...values,
        min: parseFloat(values.min),
        max: parseFloat(values.max),
        tickStep: parseInt(values.tickStep, 10),
      }
    );
    closeModal();
  }

  render() {
    return (
      <AddPlotAxis
        onSubmit={this.willAddAxis}
        axes={this.props.axes}
        form={`add-plot-axis-${this.props.viewId}`}
        initialValues={initialValues}
      />
    );
  }
}

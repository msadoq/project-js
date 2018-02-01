// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Plot axis edition general revision. Fields min, max and tickStep are stored in store as float, float, int, but handled in ReduxForm as strings.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : Plot axes log settings stored in store and documents.
// END-HISTORY
// ====================================================================

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
  logarithmic: false,
  logSettings: {
    min: '0.1',
    max: '1000000000',
    base: '10',
  },
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
        logSettings: {
          min: parseFloat(values.logSettings.min),
          max: parseFloat(values.logSettings.max),
          base: parseInt(values.logSettings.base, 10),
        },
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

import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import PlotAxis from './PlotAxis';

export default class PlotAxes extends React.Component {
  static propTypes = {
    axes: PropTypes.array.isRequired,
    handlePlotAxes: PropTypes.func.isRequired,
  }
  state = {};
  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  render() {
    const {
      axes,
      handlePlotAxes
    } = this.props;

    return (
      <Accordion>
        {axes.map((axis, key) =>
          <Panel
            key={key}
            header={axis.label}
            eventKey={key}
            expanded={this.state[`isPanel${key}Open`]}
            onSelect={this.openPanel.bind(key)}
            onExited={this.closePanel.bind(key)}
          >
            {this.state[`isPanel${key}Open`] &&
              <PlotAxis
                key={key}
                idAxe={key}
                label={axis.label}
                unit={axis.unit}
                axisStyle={axis.style}
                min={axis.min}
                max={axis.max}
                autoLimits={axis.autoLimits}
                tickStep={axis.tickStep}
                autoTick={axis.autoTick}
                showTicks={axis.showTicks}
                showTickLabels={axis.showTickLabels}
                isLogarithmic={axis.isLogarithmic}
                showAxis={axis.showAxis}
                style={axis.style}
                handlePlotAxes={handlePlotAxes}
              />}
          </Panel>)}
      </Accordion>
    );
  }
}

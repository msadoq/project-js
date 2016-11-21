import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import PlotMarker from './PlotMarker';

export default class PlotMarkers extends React.Component {
  static propTypes = {
    markers: PropTypes.array.isRequired,
    axes: PropTypes.array.isRequired,
    handlePlotMarkers: PropTypes.func.isRequired,
  }
  state = {};
  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  render() {
    const {
      markers,
      axes,
      handlePlotMarkers
    } = this.props;

    return (
      <Accordion>
        {markers.map((marker, key) =>
          <Panel
            key={key}
            header={marker.label}
            eventKey={key}
            expanded={this.state[`isPanel${key}Open`]}
            onSelect={this.openPanel.bind(key)}
            onExited={this.closePanel.bind(key)}
          >
            {this.state[`isPanel${key}Open`] &&
              <PlotMarker
                key={key}
                idAxe={key}
                kind={marker.kind}
                label={marker.label}
                relPosX={marker.relativePosX}
                relPosY={marker.relativePosY}
                markerStyle={marker.style}
                handlePlotMarker={handlePlotMarkers}
                axes={axes}
              />}
          </Panel>)}
      </Accordion>
    );
  }
}

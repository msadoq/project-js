import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import { formValueSelector } from 'redux-form';
import PlotMarker from './PlotMarker';

export default class PlotMarkers extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    markers: PropTypes.array.isRequired,
    axes: PropTypes.array.isRequired,
    updateMarker: PropTypes.func.isRequired,
  }
  state = {};

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  handleSubmit = (key, values) => {
    const { updateMarker, viewId } = this.props;
    updateMarker(viewId, key, values);
  }

  render() {
    const {
      markers,
      axes,
      viewId
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
                index={key}
                axes={axes}
                initialValues={marker}
                formName={`axis-form-${key}-${viewId}`}
                selector={formValueSelector(`axis-form-${key}-${viewId}`)}
                onSubmit={this.handleSubmit.bind(this, key)}
                form={`axis-form-${key}-${viewId}`}
              />}
          </Panel>)}
      </Accordion>
    );
  }
}

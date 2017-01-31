import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel
} from 'react-bootstrap';
import _memoize from 'lodash/memoize';
import { formValueSelector } from 'redux-form';
import PlotMarker from './PlotMarker';

export default class PlotMarkers extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    markers: PropTypes.array.isRequired,
    axes: PropTypes.object.isRequired,
    updateMarker: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    headerRole: PropTypes.string.isRequired,
    panelRole: PropTypes.string.isRequired,
    eventKey: PropTypes.string.isRequired,
    collapsible: PropTypes.bool.isRequired,
  }
  state = {
    isMarkersOpen: false
  };

  openPanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: true }));
  closePanel = _memoize(key => () => this.setState({ [`isPanel${key}Open`]: false }));

  openMarkers = () => this.setState({ isMarkersOpen: true });
  closeMarkers = () => this.setState({ isMarkersOpen: false });

  handleSubmit(key, values) {
    const { updateMarker, viewId } = this.props;
    updateMarker(viewId, key, values);
  }

  handleSubmit = _memoize(key => (fn => fn(key))(this.handleSubmit.bind(this)));

  openParentAccordion = (key, e) => {
    const {
      open,
      onSelect
    } = this.props;

    onSelect(key, e);
    open();
  }

  render() {
    const {
      markers,
      axes,
      viewId,
      expanded,
      close,
      eventKey,
      headerRole,
      panelRole,
      collapsible
    } = this.props;
    // const { isMarkersOpen } = this.state;

    return (
      <Panel
        header="Markers"
        onSelect={this.openParentAccordion}
        onExited={close}
        collapsible={collapsible}
        expanded={expanded}
        eventKey={eventKey}
        headerRole={headerRole}
        panelRole={panelRole}
      >
        <Accordion>
          {markers.map((marker, key) =>
            <Panel
              key={key}
              header={marker.label}
              eventKey={key}
              expanded={this.state[`isPanel${key}Open`]}
              onSelect={this.openPanel(key)}
              onExited={this.closePanel(key)}
            >
              {this.state[`isPanel${key}Open`] &&
                <PlotMarker
                  key={key}
                  index={key}
                  axes={axes}
                  initialValues={marker}
                  formName={`axis-form-${key}-${viewId}`}
                  selector={formValueSelector(`axis-form-${key}-${viewId}`)}
                  onSubmit={this.handleSubmit(key)}
                  form={`axis-form-${key}-${viewId}`}
                />}
            </Panel>)}
        </Accordion>
      </Panel>
    );
  }
}

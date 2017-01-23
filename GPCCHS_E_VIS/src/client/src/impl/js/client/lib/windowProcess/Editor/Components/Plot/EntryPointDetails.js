import React, { PropTypes } from 'react';

import {
  Accordion,
  Panel
} from 'react-bootstrap';

import EntryPointParameters from './EntryPointParameters';
import EntryPointConnectedDataXY from './EntryPointConnectedDataXY';
import EntryPointStateColors from '../EntryPoint/EntryPointStateColors';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
    idPoint: PropTypes.number,
    axes: PropTypes.object,
    entryPoint: PropTypes.object,
    updateEntryPoint: PropTypes.func.isRequired,
  }

  state = {
    isPanelCoordinatesOpen: false,
    isPanelStateColorsOpen: false,
    isPanelParametersOpen: false,
  };

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      ...values
    });
  }

  handleObjectParametersSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      objectStyle: values,
      name: values.name,
    });
  }

  handleConnectedDataXYSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    /*
      If EP is timeBasedData, x values must equal y values
    */
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      connectedDataY: values.y,
      connectedDataX: {
        ...values.x,
        domain: values.timeBasedData ? values.y.domain : values.x.domain,
        timeline: values.timeBasedData ? values.y.timeline : values.x.timeline,
        axisId: 'Time',
      },
      timeBasedData: values.timeBasedData,
    });
  }

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  render() {
    const {
      idPoint,
      entryPoint,
      viewId,
      axes,
      timelines,
    } = this.props;

    const {
      isPanelCoordinatesOpen,
      isPanelStateColorsOpen,
      isPanelParametersOpen,
    } = this.state;

    return (
      <Accordion>
        <Panel
          key={'Parameters'}
          header="Parameters"
          eventKey={'Parameters'}
          expanded={isPanelParametersOpen}
          onSelect={this.openPanel.bind('Parameters')}
          onExited={this.closePanel.bind('Parameters')}
        >
          {isPanelParametersOpen && <EntryPointParameters
            onSubmit={this.handleObjectParametersSubmit}
            form={`entrypoint-parameters-form-${idPoint}-${viewId}`}
            initialValues={{ ...entryPoint.objectStyle, name: entryPoint.name }}
          />}
        </Panel>

        <Panel
          key={'Coordinates'}
          header="Coordinates"
          eventKey={'Coordinates'}
          expanded={isPanelCoordinatesOpen}
          onSelect={this.openPanel.bind('Coordinates')}
          onExited={this.closePanel.bind('Coordinates')}
        >
          {isPanelCoordinatesOpen && <EntryPointConnectedDataXY
            axes={axes}
            timelines={timelines}
            idPoint={idPoint}
            viewId={viewId}
            form={`entrypoint-connectedDataXY-form-${idPoint}-${viewId}`}
            onSubmit={this.handleConnectedDataXYSubmit}
            initialValues={{
              x: entryPoint.connectedDataX,
              y: entryPoint.connectedDataY,
              timeBasedData: entryPoint.timeBasedData,
            }}
          />}
        </Panel>
        <Panel
          key={'StateColors'}
          header="State colors"
          eventKey={'StateColors'}
          expanded={isPanelStateColorsOpen}
          onSelect={this.openPanel.bind('StateColors')}
          onExited={this.closePanel.bind('StateColors')}
        >
          {isPanelStateColorsOpen && <EntryPointStateColors
            initialValues={{
              stateColors: entryPoint.stateColors || []
            }}
            form={`entrypoint-stateColors-form-${idPoint}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Accordion>
    );
  }
}

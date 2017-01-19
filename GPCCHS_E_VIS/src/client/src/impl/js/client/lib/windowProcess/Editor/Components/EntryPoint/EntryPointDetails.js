/* eslint-disable */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Glyphicon,
  Collapse,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Table,
  Accordion,
  Panel
} from 'react-bootstrap';

import {
  EntryPointConnectedData,
  EntryPointConnectedDataXY,
  EntryPointParameters,
  EntryPointName,
  EntryPointStateColors
} from './'

import ColorPicker from '../ColorPicker';
import SelectButton from '../Buttons/SelectButton';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
    idPoint: PropTypes.number,
    axes: PropTypes.object,
    entryPoint: PropTypes.object,
  }

  state = {
    isPanelNameOpen: false,
    isPanelConnDataOpen: false,
    isPanelCoordinatesOpen: false,
    isPanelStateColorsOpen: false,
    isPanelParametersOpen: false,
    nameEditable: false,
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

  /*
    RightClick on Name : cette fonction permet de rendre le nom de l'entrypoint éditable
  */
  rcOnName(e) {
    e.preventDefault();
    this.setState({ nameEditable: !this.state.Editable });
  }

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  render() {
    const {
      idPoint,
      entryPoint,
      viewId,
      axes,
      type,
      timelines,
    } = this.props;

    const {
      isPanelNameOpen,
      isPanelConnDataOpen,
      isPanelCoordinatesOpen,
      isPanelStateColorsOpen,
      isPanelParametersOpen,
      newStateColor,
      nameEditable
     } = this.state;

    const isTextView = type === 'TextView';
    const isPlotView = type === 'PlotView';

    return (
      <Accordion>
        {isTextView && <Panel
          key={'Name'}
          header="Name"
          eventKey={'Name'}
          expanded={isPanelNameOpen}
          onSelect={this.openPanel.bind('Name')}
          onExited={this.closePanel.bind('Name')}
        >
          {isPanelNameOpen && <EntryPointName
            onSubmit={this.handleSubmit}
            form={`entrypoint-title-form-${idPoint}-${viewId}`}
            initialValues={{
              name: entryPoint.name
            }}
          />}
        </Panel>}
        {isPlotView && <Panel
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
            initialValues={{...entryPoint.objectStyle, name: entryPoint.name }}
          />}
        </Panel>}

        {isTextView && <Panel
          key={'ConnData'}
          header="Conn Data"
          eventKey={'ConnData'}
          expanded={isPanelConnDataOpen}
          onSelect={this.openPanel.bind('ConnData')}
          onExited={this.closePanel.bind('ConnData')}
        >
          {isPanelConnDataOpen && <EntryPointConnectedData
            axes={axes}
            timelines={timelines}
            form={`entrypoint-connectedData-form-${idPoint}-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
            initialValues={entryPoint.connectedData}
          />}
        </Panel>}
        {isPlotView && <Panel
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
        </Panel>}
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
    )
  }
}

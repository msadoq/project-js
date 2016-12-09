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
    handleEntryPoint: PropTypes.func
  }

  state = {
    isPanelNameOpen: false,
    isPanelConnDataOpen: false,
    isPanelCoordinatesOpen: false,
    isPanelStateColorsOpen: false,
    isPanelParametersOpen: false,
    nameEditable: false,
    newStateColor: '#FFFFFF',
    newStateField: '',
    newStateOperator: '',
    newStateOperand: '',
  };

  /*
    Toutes les fonctions dont le nom commence par handle sont appelées
    par la modification d'une valeur dans un formulaire.
    @TODO : Ces fonctions doivent vérifier la conformiter de la nouvelle valeur
            et appeler une fonction passée en props pour mettre à jour cette valeur
            dans le noeud racine.
    L'utilisation de setState est temporaire, pour voir la mise à jour dans l'IHM.
  */
  handleChangeStateColor = color => this.setState({ newStateColor: color });
  handleFilter = (field, operator, operand) => this.setState({ newStateField: field, newStateOperator: operator, newStateOperand: operand });
  addStateColor = () => {
    const val = {
      field: this.state.newStateField,
      operator: this.state.newStateOperator,
      operand: this.state.newStateOperand,
      color: this.state.newStateColor
    };
    this.props.handleEntryPoint(this.props.idPoint, 'stateColors', val);
  }

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
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      connectedDataX: values.x,
      connectedDataY: values.y,
    });
  }

  handleConnectedDataSubmit = (key, values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      [key]: values
    });
  }

  removeStateColor = (key) => {
    const val = { keyToRemove: key };
    this.props.handleEntryPoint(this.props.idPoint, 'stateColors', val);
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
            onSubmit={this.handleConnectedDataSubmit.bind(this, 'connectedData')}
            initialValues={this.props.entryPoint.connectedData}
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
              x: this.props.entryPoint.connectedDataX,
              y: this.props.entryPoint.connectedDataY,
            }}
          />}
        </Panel>}
        {isPlotView && <Panel
          key={'StateColors'}
          header="State colors"
          eventKey={'StateColors'}
          expanded={isPanelStateColorsOpen}
          onSelect={this.openPanel.bind('StateColors')}
          onExited={this.closePanel.bind('StateColors')}
        >
          {isPanelStateColorsOpen && <EntryPointStateColors
            stateColors={entryPoint.stateColors}
            newStateColor={newStateColor}
            removeStateColor={this.removeStateColor}
            handleFilter={this.handleFilter}
            handleChangeStateColor={this.handleChangeStateColor}
            addStateColor
          />}
        </Panel>}
      </Accordion>
    )
  }
}

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
  EntryPointStyle,
  EntryPointName,
  EntryPointStateColours
} from './'

import ColorPicker from '../ColorPicker';
import SelectButton from '../Buttons/SelectButton';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    idPoint: PropTypes.number,
    axes: PropTypes.object,
    entryPoint: PropTypes.object,
    handleEntryPoint: PropTypes.func
  }

  state = {
    isPanelNameOpen: false,
    isPanelStyleOpen: false,
    isPanelConnDataOpen: false,
    isPanelOrdinateOpen: false,
    isPanelAbscissOpen: false,
    isPanelStateColoursOpen: false,
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
    this.props.handleEntryPoint(this.props.idPoint, 'stateColours', val);
  }

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      ...values
    });
  }

  handleObjectStyleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId, idPoint } = this.props;
    updateEntryPoint(viewId, idPoint, {
      ...entryPoint,
      objectStyle: values
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
    this.props.handleEntryPoint(this.props.idPoint, 'stateColours', val);
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
      axes
    } = this.props;

    const {
      isPanelNameOpen,
      isPanelStyleOpen,
      isPanelConnDataOpen,
      isPanelOrdinateOpen,
      isPanelAbscissOpen,
      isPanelStateColoursOpen,
      newStateColor,
      nameEditable
     } = this.state;

    return (
      <Accordion>
        {entryPoint.name && <Panel
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
        {entryPoint.objectStyle && <Panel
          key={'Style'}
          header="Style"
          eventKey={'Style'}
          expanded={isPanelStyleOpen}
          onSelect={this.openPanel.bind('Style')}
          onExited={this.closePanel.bind('Style')}
        >
          {isPanelStyleOpen && <EntryPointStyle
            onSubmit={this.handleObjectStyleSubmit}
            form={`entrypoint-style-form-${idPoint}-${viewId}`}
            initialValues={entryPoint.objectStyle}
          />}
        </Panel>}
        {entryPoint.connectedData && <Panel
          key={'ConnData'}
          header="Conn Data"
          eventKey={'ConnData'}
          expanded={isPanelConnDataOpen}
          onSelect={this.openPanel.bind('ConnData')}
          onExited={this.closePanel.bind('ConnData')}
        >
          {isPanelConnDataOpen && <EntryPointConnectedData
            axes={axes}
            form={`entrypoint-connectedData-form-${idPoint}-${viewId}`}
            onSubmit={this.handleConnectedDataSubmit.bind(this, 'connectedData')}
            initialValues={this.props.entryPoint.connectedData}
          />}
        </Panel>}
        {entryPoint.connectedDataY && <Panel
          key={'Ordinate'}
          header="Ordinate"
          eventKey={'Ordinate'}
          expanded={isPanelOrdinateOpen}
          onSelect={this.openPanel.bind('Ordinate')}
          onExited={this.closePanel.bind('Ordinate')}
        >
          {isPanelOrdinateOpen && <EntryPointConnectedData
            axes={axes}
            form={`entrypoint-connectedDataY-form-${idPoint}-${viewId}`}
            onSubmit={this.handleConnectedDataSubmit.bind(this, 'connectedDataY')}
            initialValues={this.props.entryPoint.connectedDataY}
          />}
        </Panel>}
        {entryPoint.connectedDataX && <Panel
          key={'Absciss'}
          header="Absciss"
          eventKey={'Absciss'}
          expanded={isPanelAbscissOpen}
          onSelect={this.openPanel.bind('Absciss')}
          onExited={this.closePanel.bind('Absciss')}
        >
          {isPanelAbscissOpen && <EntryPointConnectedData
            axes={axes}
            form={`entrypoint-connectedDataX-form-${idPoint}-${viewId}`}
            onSubmit={this.handleConnectedDataSubmit.bind(this, 'connectedDataX')}
            initialValues={this.props.entryPoint.connectedDataX}
          />}
        </Panel>}
        {entryPoint.stateColours && <Panel
          key={'StateColours'}
          header="State colours"
          eventKey={'StateColours'}
          expanded={isPanelStateColoursOpen}
          onSelect={this.openPanel.bind('StateColours')}
          onExited={this.closePanel.bind('StateColours')}
        >
          {isPanelStateColoursOpen && <EntryPointStateColours
            stateColours={entryPoint.stateColours}
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

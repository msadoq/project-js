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

import EntryPointConnectedData from './EntryPointConnectedData';
import ColorPicker from '../ColorPicker';
import SelectButton from '../Buttons/SelectButton';
import styles from './EntryPointDetails.css';
import EntryPointStyle from './EntryPointStyle';
import EntryPointStateColours from './EntryPointStateColours';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    idPoint: PropTypes.number,
    entryPoint: PropTypes.object,
    handleEntryPoint: PropTypes.func
  }

  state = {
    nameEditable: false,
    newStateColor: '#FFFFFF',
    newStateField: '',
    newStateOperator: '',
    newStateOperand: '',
  };

  componentWillMount(){
    this.setState({
      name: this.props.entryPoint.name
    });
  }

  /*
    Toutes les fonctions dont le nom commence par handle sont appelées
    par la modification d'une valeur dans un formulaire.
    @TODO : Ces fonctions doivent vérifier la conformiter de la nouvelle valeur
            et appeler une fonction passée en props pour mettre à jour cette valeur
            dans le noeud racine.
    L'utilisation de setState est temporaire, pour voir la mise à jour dans l'IHM.
  */
  handleLineStyle = val => this.props.handleEntryPoint(this.props.idPoint, 'lineStyle', val);
  handlePoints = val => this.props.handleEntryPoint(this.props.idPoint, 'pointsStyle', val);
  handleName = e => this.props.handleEntryPoint(this.props.idPoint, 'name', this.state.name);
  handleCurveColour = color => this.props.handleEntryPoint(this.props.idPoint, 'curveColour', color);
  handleDataYChange = (label, val) => this.props.handleEntryPoint(this.props.idPoint, `connectedDataY.${label}`, val);
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
      entryPoint
    } = this.props;

    const {
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
        {entryPoint.lineStyle && <Panel
          key={'Style'}
          header="Style"
          eventKey={'Style'}
          expanded={isPanelStyleOpen}
          onSelect={this.openPanel.bind('Style')}
          onExited={this.closePanel.bind('Style')}
        >
          {isPanelStyleOpen && <EntryPointStyle
            entryPoint={entryPoint}
            handleCurveColour={this.handleCurveColour}
            handleLineStyle={this.handleLineStyle}
            handlePoints={this.handlePoints}
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
            connectedData={this.props.entryPoint.connectedData}
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
            connectedData={this.props.entryPoint.connectedDataY}
            handleChange={this.handleDataYChange}
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
            connectedData={this.props.entryPoint.connectedDataX}
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

    /*
    return (
      <div className={styles.EntryPointTreeFirstLvl}>
        <div>
          <FormControl
            autoFocus
            type="text"
            className="input-sm"
            value={this.state.name}
            onChange={(e) => this.setState({ name:  e.target.value })}
            onBlur={this.handleName}
            style={{ width: '200px', display: 'inline' }}
          />
          <div >
            {
            (this.props.entryPoint.lineStyle !== undefined &&
             this.props.entryPoint.pointsStyle !== undefined &&
             this.props.entryPoint.curveColour !== undefined) ?
               <div>
                  <button
                    className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openG })}
                    onClick={this.toggleOpenG}
                  >
                    <Glyphicon
                      className={styles.glyphMenu}
                      glyph={openG ? 'menu-down' : 'menu-right'}
                    /> Styles
                  </button>
                  {openG && <Collapse in={openG}>
                    <EntryPointStyle
                      entryPoint={entryPoint}
                      handleCurveColour={this.handleCurveColour}
                      handleLineStyle={this.handleLineStyle}
                      handlePoints={this.handlePoints}
                    />
                  </Collapse>}
               </div>
            : null}
            {(this.props.entryPoint.connectedData !== undefined) ?
              <div>
                <button
                  className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openC })}
                  onClick={this.toggleOpenC}
                >
                  <Glyphicon
                    className={styles.glyphMenu}
                    glyph={openC ? 'menu-down' : 'menu-right'}
                  /> Conn Data
                </button>
                {openC && <Collapse in={openC}>
                  <div >
                    <EntryPointConnectedData
                      connectedData={this.props.entryPoint.connectedData}
                    />
                  </div>
                </Collapse>}
              </div>
            : null}
            {(this.props.entryPoint.connectedDataY !== undefined) ?
              <div>
                <button
                  className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openY })}
                  onClick={this.toggleOpenY}
                >
                  <Glyphicon
                    className={styles.glyphMenu}
                    glyph={openY ? 'menu-down' : 'menu-right'}
                  />
                      Ordinate
                </button>
                {openY && <Collapse in={openY}>
                  <div >
                    <EntryPointConnectedData
                      connectedData={this.props.entryPoint.connectedDataY}
                      handleChange={this.handleDataYChange}
                    />
                  </div>
                </Collapse>}
              </div>
            : null}
            {(this.props.entryPoint.connectedDataX !== undefined) ?
              <div>
                <button
                  className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openX })}
                  onClick={this.toggleopenX}
                >
                  <Glyphicon
                    className={styles.glyphMenu}
                    glyph={openX ? 'menu-down' : 'menu-right'}
                  />
                    Absciss
                </button>
                {openX && <Collapse in={openX}>
                  <div >
                    <EntryPointConnectedData connectedData={this.props.entryPoint.connectedDataX} />
                  </div>
                </Collapse>}
              </div>
            : null}
            {(entryPoint.stateColours !== undefined) ?
              <div>
                <button
                  className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openST })}
                  onClick={this.toggleOpenST}
                >
                  <Glyphicon
                    className={styles.glyphMenu}
                    glyph={openST ? 'menu-down' : 'menu-right'}
                  />
                  State colours
                </button>
                {openST && <Collapse in={openST}>
                  <div >
                    <EntryPointStateColours
                      stateColours={entryPoint.stateColours}
                      filterOptions={filterOptions}
                      newStateColor={newStateColor}
                      removeStateColor={this.removeStateColor}
                      handleFilter={this.handleFilter}
                      handleChangeStateColor={this.handleChangeStateColor}
                      addStateColor
                    />
                  </div>
                </Collapse>}
              </div>
            : null}
          </div>
        </div>
      </div>
    );
    */
  }
}

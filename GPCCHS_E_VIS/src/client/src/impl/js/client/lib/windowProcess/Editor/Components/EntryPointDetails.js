/* eslint-disable */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Glyphicon,
         Collapse,
         Form,
         FormGroup,
         FormControl,
         Col,
         ControlLabel,
         Table
       } from 'react-bootstrap';
import EntryPointConnectedData from './EntryPointConnectedData';
import ColorPicker from './ColorPicker';
import SelectButton from './Buttons/SelectButton';
import styles from './EntryPointDetails.css';
import FilterData from './FilterData';

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends React.Component {
  static propTypes = {
    idPoint: PropTypes.number,
    entryPoint: PropTypes.object,
    handleEntryPoint: PropTypes.func,
    remove: PropTypes.func
  }

  state = {
    open: false,
    openG: false,
    openC: false,
    openY: false,
    openX: false,
    openST: false,
    nameEditable: false,
    newStateColor: '#FFFFFF',
    newStateField: '',
    newStateOperator: '',
    newStateOperand: '',
  };

  filters = [
    'convertedValue', 'extractedValue', 'groundDate',
    'isNominal', 'isObsolete', 'monitoringState',
    'onBoardDate', 'rawValue', 'triggerOffCounter',
    'triggerOnCounter', 'validityState'
  ];

  /*
    Toutes les fonctions dont le nom commence par handle sont appelées
    par la modification d'une valeur dans un formulaire.
    @TODO : Ces fonctions doivent vérifier la conformiter de la nouvelle valeur
            et appeler une fonction passée en props pour mettre à jour cette valeur
            dans le noeud racine.
    L'utilisation de setState est temporaire, pour voir la mise à jour dans l'IHM.
  */
  handleLineStyle = val => this.props.handleEntryPoint(this.props.idPoint, 'lineStyle', val);
  handlePoints = val => this.props.handleEntryPoint(this.props.idPoint, 'pointStyle', val);
  handleName = e => this.props.handleEntryPoint(this.props.idPoint, 'name', e.target.value);
  handleCurveColour = color => this.props.handleEntryPoint(this.props.idPoint, 'curveColour', color);
  handleDataYChange = (label, val) => this.props.handleEntryPoint(this.props.idPoint, `connectedDataY.${label}`, val);
  removeEntryPoint = () => this.props.remove(this.props.idPoint);
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
    this.setState({ open: !this.state.open });
  }

  toggleOpen = () => this.setState({ open: !this.state.open });
  toggleOpenG = () => this.setState({ openG: !this.state.openG });
  toggleOpenC = () => this.setState({ openC: !this.state.openC });
  toggleOpenY = () => this.setState({ openY: !this.state.openY });
  toggleOpenX = () => this.setState({ openX: !this.state.openX });
  toggleOpenST = () => this.setState({ openST: !this.state.openST });

  render() {
    const {
      open,
      openG,
      openC,
      openY,
      openX,
      openST,
      newStateColor,
      nameEditable
     } = this.state;

    const stateColours =
    (this.props.entryPoint.stateColours && this.props.entryPoint.stateColours.length > 0) ?
       this.props.entryPoint.stateColours.map((stateColour, key) => (
         <tr key={key}>
           <td className="col-xs-2"><ColorPicker color={stateColour.colour} /></td>
           <td className="col-xs-9">{stateColour.condition.field} {stateColour.condition.operator} {stateColour.condition.operand}</td>
           <td className="col-xs-1">
             <Glyphicon glyph="trash" onClick={() => this.removeStateColor(key)} />
           </td>
         </tr>
          )) :
            <tr>no marker</tr>;
    const filterOptions = this.filters.map((filter, key) =>
      <option key={key} value={filter}>{filter}</option>);
    return (
      <div className={styles.EntryPointTreeFirstLvl}>
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: open })}
          onClick={this.toggleOpen}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={open ? 'menu-down' : 'menu-right'}
          />
          {' '}
          {(nameEditable) ?
            <FormControl
              autoFocus
              controlId="name"
              type="text"
              className={styles.input_xsmall}
              value={this.props.entryPoint.name}
              onChange={this.handleName}
              onBlur={() => this.setState({ nameEditable: false })}
              style={{ width: '200px', display: 'inline' }}
              /* NEED IT TO SET CURSOR AT THE END
              onFocus={(e) => { e.target.value = e.target.value; }}
              */
            /> : this.props.entryPoint.name}
        </button>
        <button className="pull-right btn-link">
          <Glyphicon className={styles.danger} onClick={this.removeEntryPoint} glyph="remove" title="Remove" />
        </button>
        <button className="pull-right btn-link">
          <Glyphicon
            className={styles.default}
            glyph="pencil"
            title="Update"
            onClick={e => this.rcOnName(e)}
          />{' '}
        </button>
        {open && <Collapse in={open}>
          <div className={styles.shift}>
            {
            (this.props.entryPoint.lineStyle !== undefined &&
             this.props.entryPoint.pointsStyle !== undefined &&
             this.props.entryPoint.curveColour !== undefined) ?
             /* STYLES COLLAPSE - TODO : CREATE COMPONENT */
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
                    <div className={classnames(styles.shift, styles.mt5)}>
                      <Form horizontal>
                        <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
                          <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Line
                          </Col>
                          <Col xs={9}>
                            <SelectButton
                              size="xsmall"
                              active={this.props.entryPoint.lineStyle}
                              buttons={[
                              { label: 'Continuous', icon: 'continuous' },
                              { label: 'Dashed', icon: 'dashed' },
                              { label: 'Dotted', icon: 'doted' }
                              ]}
                              iconOnly="true"
                              onChange={this.handleLineStyle}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup
                          className={styles.formGroupXsmall}
                          controlId="formHorizontalTimeline"
                          >
                          <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Points
                          </Col>
                          <Col xs={9}>
                            <SelectButton
                              size="xsmall"
                              active={this.props.entryPoint.pointsStyle}
                              buttons={[
                            { label: 'None', icon: 'none' },
                            { label: 'Triangle', icon: 'triangle' },
                            { label: 'Square', icon: 'square' },
                            { label: 'Dot', icon: 'dot' }
                              ]}
                              onChange={this.handlePoints}
                          />
                          </Col>
                        </FormGroup>
                        <FormGroup
                          className={styles.formGroupXsmall}
                          controlId="formHorizontalTimeline"
                          >
                          <Col componentClass={ControlLabel} xs={3} className={styles.formLabel}>
                        Color
                          </Col>
                          <Col xs={9}>
                            <ColorPicker
                              color={this.props.entryPoint.curveColour}
                              onChange={this.handleCurveColour}
                          />
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                  </Collapse>}
               </div>
            /* END STYLES COLLAPSE */
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
                  <div className={classnames(styles.shift, styles.mt5)}>
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
                  <div className={classnames(styles.shift, styles.mt5)}>
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
                  <div className={classnames(styles.shift, styles.mt5)}>
                    <EntryPointConnectedData connectedData={this.props.entryPoint.connectedDataX} />
                  </div>
                </Collapse>}
              </div>
            : null}
            {(this.props.entryPoint.stateColours !== undefined) ?
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
                  <div className={classnames(styles.shift, styles.mt5)}>
                    <Table condensed striped style={{ fontSize: '12px' }}>
                      <thead>
                        <tr>
                          <th>Color</th>
                          <th>Condition</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stateColours}
                        <tr>
                          <td className="col-xs-2"><ColorPicker color={newStateColor} onChange={this.handleChangeStateColor} /></td>
                          <td className="col-xs-8">
                            <FilterData
                              filterOptions={filterOptions} onChange={this.handleFilter}
                            />
                          </td>
                          <td className="col-xs-2"> <Glyphicon glyph="plus" onClick={this.addStateColor} /></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Collapse>}
              </div>
            : null}
          </div>
        </Collapse>}
      </div>
    );
  }
}

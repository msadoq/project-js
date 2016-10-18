import React from 'react';
import classNames from 'classnames';
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
    idPoint: React.PropTypes.number,
    entryPoint: React.PropTypes.object,
    handleEntryPoint: React.PropTypes.func,
    remove: React.PropTypes.func
  }
  constructor(...args) {
    super(...args);
    this.state = {
      nameEditable: false,
      newStateColor: '#FFFFFF',
      newStateField: '',
      newStateOperator: '',
      newStateOperand: '',
      filter: ['convertedValue', 'extractedValue', 'groundDate', 'isNominal', 'isObsolete', 'monitoringState', 'onBoardDate', 'rawValue', 'triggerOffCounter', 'triggerOnCounter', 'validityState']
    };
    this.handleLineStyle = this.handleLineStyle.bind(this);
    this.handlePoints = this.handlePoints.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCurveColour = this.handleCurveColour.bind(this);
    this.handleDataYChange = this.handleDataYChange.bind(this);
    this.removeEntryPoint = this.removeEntryPoint.bind(this);
    this.handleChangeStateColor = this.handleChangeStateColor.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.addStateColor = this.addStateColor.bind(this);
    this.removeStateColor = this.removeStateColor.bind(this);
  }
  /*
    Toutes les fonctions dont le nom commence par handle sont appelées
    par la modification d'une valeur dans un formulaire.
    @TODO : Ces fonctions doivent vérifier la conformiter de la nouvelle valeur
            et appeler une fonction passée en props pour mettre à jour cette valeur
            dans le noeud racine.
    L'utilisation de setState est temporaire, pour voir la mise à jour dans l'IHM.
  */
  handleLineStyle(val) {
    this.props.handleEntryPoint(this.props.idPoint, 'lineStyle', val);
  }
  handlePoints(val) {
    this.props.handleEntryPoint(this.props.idPoint, 'pointStyle', val);
  }
  handleName(e) {
    this.props.handleEntryPoint(this.props.idPoint, 'name', e.target.value);
  }
  handleCurveColour(color) {
    this.props.handleEntryPoint(this.props.idPoint, 'curveColour', color);
  }
  handleDataYChange(label, val) {
    this.props.handleEntryPoint(this.props.idPoint, `connectedDataY.${label}`, val);
  }
  removeEntryPoint() {
    this.props.remove(this.props.idPoint);
  }
  handleChangeStateColor(color) {
    this.setState({ newStateColor: color });
  }
  handleFilter(field, operator, operand) {
    this.setState({ newStateField: field, newStateOperator: operator, newStateOperand: operand });
  }
  addStateColor() {
    const val = {
      field: this.state.newStateField,
      operator: this.state.newStateOperator,
      operand: this.state.newStateOperand,
      color: this.state.newStateColor
    };
    this.props.handleEntryPoint(this.props.idPoint, 'stateColours', val);
  }
  removeStateColor(key) {
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
  render() {
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
    const filterOptions = this.state.filter.map((filter, key) =>
      <option key={key} value={filter}>{filter}</option>);
    return (
      <div className={styles.EntryPointTreeFirstLvl}>
        <a
          className={
            this.state.open ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.open ? 'menu-down' : 'menu-right'}
          />
          &nbsp;
          {(this.state.nameEditable) ?
            <FormControl
              autoFocus
              controlId="name"
              type="text"
              className={styles.input_xsmall}
              value={this.props.entryPoint.name}
              onChange={this.handleName}
              onBlur={() => this.setState({ nameEditable: false })}
              style={{ width: '200px', display: 'inline' }}
              /* NEED IT TO SET CURSOR AT THE END */
              onFocus={(e) => { e.target.value = e.target.value; }}
            /> : this.props.entryPoint.name}
        </a>
        <a className="pull-right">

          <Glyphicon className={styles.danger} onClick={this.removeEntryPoint} glyph="remove" title="Remove" />
        </a>
        <a className="pull-right">
          <Glyphicon
            className={styles.default}
            glyph="pencil"
            title="Update"
            onClick={e => this.rcOnName(e)}
          />&nbsp;&nbsp;
        </a>
        <Collapse in={this.state.open}>
          <div className={styles.shift}>
            {
            (this.props.entryPoint.lineStyle !== undefined &&
             this.props.entryPoint.pointsStyle !== undefined &&
             this.props.entryPoint.curveColour !== undefined) ?
             /* STYLES COLLAPSE - TODO : CREATE COMPONENT */
               <div>
               <a
                 className={
                  this.state.openG ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                 onClick={() => this.setState({ openG: !this.state.openG })}
               >
                 <Glyphicon
                   className={styles.glyphMenu}
                   glyph={this.state.openG ? 'menu-down' : 'menu-right'}
                 /> Styles
               </a>
                 <Collapse in={this.state.openG}>
                   <div className={classNames(styles.shift, styles.mt5)}>
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
                 </Collapse>
               </div>
            /* END STYLES COLLAPSE */
            : null}
            {(this.props.entryPoint.connectedData !== undefined) ?
              <div>
              <a
              className={
                  this.state.openC ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
              onClick={() => this.setState({ openC: !this.state.openC })}
            >
              <Glyphicon
                className={styles.glyphMenu}
                glyph={this.state.openC ? 'menu-down' : 'menu-right'}
              /> Conn Data
            </a>
                <Collapse in={this.state.openC}>
                  <div className={classNames(styles.shift, styles.mt5)}>
                    <EntryPointConnectedData
                      connectedData={this.props.entryPoint.connectedData}
                    />
                  </div>
                </Collapse>
              </div>
            : null}
            {(this.props.entryPoint.connectedDataY !== undefined) ?
              <div>
                    <a
                    className={
                      this.state.openY ?
                      classNames(styles.collapseEvent, styles.active) :
                      classNames(styles.collapseEvent)}
                    onClick={() => this.setState({ openY: !this.state.openY })}
                  >
                    <Glyphicon
                      className={styles.glyphMenu}
                      glyph={this.state.openY ? 'menu-down' : 'menu-right'}
                      />
                      Ordinate
                  </a>
                <Collapse in={this.state.openY}>
                  <div className={classNames(styles.shift, styles.mt5)}>
                    <EntryPointConnectedData
                      connectedData={this.props.entryPoint.connectedDataY}
                      handleChange={this.handleDataYChange}
                    />
                  </div>
                </Collapse>
              </div>
            : null}
            {(this.props.entryPoint.connectedDataX !== undefined) ?
              <div>
                <a
                  className={
                  this.state.openX ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                  onClick={() => this.setState({ openX: !this.state.openX })}
                >
                  <Glyphicon
                    className={styles.glyphMenu}
                    glyph={this.state.openX ? 'menu-down' : 'menu-right'}
                    />
                    Absciss
                </a>
                <Collapse in={this.state.openX}>
                  <div className={classNames(styles.shift, styles.mt5)}>
                    <EntryPointConnectedData connectedData={this.props.entryPoint.connectedDataX} />
                  </div>
                </Collapse>
              </div>
            : null}
            {(this.props.entryPoint.stateColours !== undefined) ?
              <div>
                <a
                  className={
                  this.state.openST ?
                  classNames(styles.collapseEvent, styles.active) :
                  classNames(styles.collapseEvent)}
                  onClick={() => this.setState({ openST: !this.state.openST })}
                >
                  <Glyphicon
                    className={styles.glyphMenu}
                    glyph={this.state.openST ? 'menu-down' : 'menu-right'}
                  />
                  State colours
                </a>
                <Collapse in={this.state.openST}>
                  <div className={classNames(styles.shift, styles.mt5)}>
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
                          <td className="col-xs-2"><ColorPicker color={this.state.newStateColor} onChange={this.handleChangeStateColor} /></td>
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
                </Collapse>
              </div>
            : null}
          </div>
        </Collapse>
      </div>
    );
  }
}

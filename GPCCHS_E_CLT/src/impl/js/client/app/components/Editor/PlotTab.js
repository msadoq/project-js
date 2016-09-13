import React from 'react';
import {
  Glyphicon,
  Collapse,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from 'react-bootstrap';
import ToggleButton from '../Buttons/ToggleButton';
import SelectButton from '../Buttons/SelectButton';
import ColorPicker from './ColorPicker.js';
import SelectFontFamilySize from './SelectFontFamilySize.js';
import SelectFontStyle from './SelectFontStyle.js';
import PlotAxis from './PlotAxis.js';
import Marker from './Marker.js';
import styles from './PlotTab.css';
import select from './Select.css';
import classNames from 'classnames';

/*
  PlotTab représente l'onglet "Plot" de l'éditeur Plot.
  C'est un arbre qui contient 4 branches :
    - TITLE : Edition du titre et des styles du titre de la Plot
    - GRID : Edition des parametres de la Grille
    - AXES : Edition des différents axes.
    - MARKERS :
*/
export default class PlotTab extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    axes: React.PropTypes.array,
    markers: React.PropTypes.array,
    grid: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    handleGrid: React.PropTypes.func,
    handlePlotTitle: React.PropTypes.func,
    handlePlotTitleStyle: React.PropTypes.func,
    handlePlotAxes: React.PropTypes.func,
    handlePlotMarkers: React.PropTypes.func
  }
  constructor(...args) {
    super(...args);
    this.state = {};
    this.handleTitle = this.handleTitle.bind(this);
    this.handleTitleStyle = this.handleTitleStyle.bind(this);
    this.handleAlign = this.handleAlign.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleWidth = this.handleWidth.bind(this);
    this.handleLineStyle = this.handleLineStyle.bind(this);
    this.handleYAxis = this.handleYAxis.bind(this);
    
    console.log(this.props.axes[0].style);
  }
  handleTitleStyle(field, value) {
    this.props.handlePlotTitleStyle(field, value);
  }
  handleTitle(e) {
    this.props.handlePlotTitle(e.target.value);
  }
  handleWidth(e) {
    this.props.handleGrid('width', e.target.value);
  }
  handleShow(state) {
    const newState = state === 'ON';
    this.props.handleGrid('showGrid', newState);
  }
  handleAlign(val) {
    this.props.handlePlotTitleStyle('align', val);
  }
  handleLineStyle(val) {
    this.props.handleGrid('lineStyle', val);
  }
  handleYAxis(e) {
    this.props.handleGrid('yAxisId', e.target.value);
  }
  render() {
    const axes = this.props.axes.map((axis, key) =>
      <PlotAxis
        key={key}
        idAxe={key}
        label={axis.label}
        unit={axis.unit}
        axisStyle={axis.style}
        min={axis.min}
        max={axis.max}
        autoLimits={axis.autoLimits}
        tickStep={axis.tickStep}
        autoTick={axis.autoTick}
        showTicks={axis.showTicks}
        showTickLabels={axis.showTickLabels}
        isLogarithmic={axis.isLogarithmic}
        showAxis={axis.showAxis}
        style={axis.style}
        handlePlotAxes={this.props.handlePlotAxes}
      />
    );
    console.log(this.props.markers);
    const markers = this.props.markers.map((marker, key) =>
      <Marker
        key={key}
        idAxe={key}
        kind={marker.kind}
        label={marker.label}
        relPosX={marker.relativePosX}
        relPosY={marker.relativePosY}
        markerStyle={marker.style}
        handlePlotMarker={this.props.handlePlotMarkers}
        axes={this.props.axes}
      />
    );
    return (
      <div className={styles.PlotTreeFirstLvl}>
      { /** ********************************************************************** **/
        /** ==============================> TITLE <=============================== **/
        /** ********************************************************************** **/ }
        <a
          className={
            this.state.openT ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ openT: !this.state.openT })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.openT ? 'menu-down' : 'menu-right'}
          />
          &nbsp;TITLE
        </a>
        <Collapse in={this.state.openT}>
          <div className={classNames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Title
                </Col>
                <Col xs={8}>
                  <FormControl
                    controlId="title"
                    type="text"
                    className={styles.input_xsmall}
                    value={this.props.title}
                    onChange={this.handleTitle}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Font
                </Col>
                <Col xs={8}>
                  <SelectFontFamilySize update={this.handleTitleStyle} />
                </Col>
              </FormGroup>
              <FormGroup
                className={styles.formGroupXsmall}
                controlId="formControlsSelect"
              >
                <Col className={styles.formLabel} componentClass={ControlLabel} xs={4}>
                  Style
                </Col>
                <Col xs={8}>
                  <SelectFontStyle
                    update={this.handleTitleStyle}
                    bold={this.props.titleStyle.bold}
                    italic={this.props.titleStyle.italic}
                    underline={this.props.titleStyle.underline}
                    strikeout={this.props.titleStyle.strikeOut}
                  />
                </Col>
              </FormGroup>
              <FormGroup
                className={styles.formGroupXsmall}
                controlId="formControlsSelect"
              >
                <Col className={styles.formLabel} componentClass={ControlLabel} xs={4}>
                  Color
                </Col>
                <Col xs={8}>
                  <ColorPicker color="#F5A623" onChange={this.handleTitleStyle} />
                </Col>
              </FormGroup>
              <FormGroup
                className={styles.formGroupXsmall}
                controlId="formControlsSelect"
              >
                <Col className={styles.formLabel} componentClass={ControlLabel} xs={4}>
                  Align
                </Col>
                <Col xs={8}>
                  <SelectButton
                    size="xsmall"
                    active={this.props.titleStyle.align}
                    buttons={[
                      { label: 'left', icon: 'alignLeft' },
                      { label: 'center', icon: 'alignCenter' },
                      { label: 'right', icon: 'alignRight' }
                    ]}
                    onChange={this.handleAlign}
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Collapse>
        <br />
      { /** ********************************************************************** **/
        /** ==============================> GRID <=============================== **/
        /** ********************************************************************** **/ }
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
          />
          &nbsp;GRID
        </a>
        <Collapse in={this.state.openG}>
          <div className={classNames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Show
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.grid.showGrid === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleShow}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Line
                </Col>
                <Col xs={8}>
                  <SelectButton
                    size="xsmall"
                    active={this.props.grid.lineStyle}
                    buttons={[
                      { label: 'Continuous', icon: 'continuous' },
                      { label: 'Dashed', icon: 'dashed' },
                      { label: 'Dotted', icon: 'doted' }
                    ]}
                    onChange={this.handleLineStyle}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Y Axis
                </Col>
                <Col xs={8}>
                  <FormControl
                    value={this.props.grid.yAxisId}
                    onChange={this.handleYAxis}
                    componentClass="select"
                    className={select.xsmall}
                  >
                    <option value="time">Time</option>
                    <option value="frequency">Frequency</option>
                    <option value="temperature">Temperature</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Width
                </Col>
                <Col xs={8}>
                  <FormControl
                    controlId="name"
                    type="number"
                    className={styles.input_xsmall}
                    value={this.props.grid.width}
                    onChange={this.handleWidth}
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Collapse>
        <br />
      { /** ********************************************************************** **/
        /** ==============================> AXES <=============================== **/
        /** ********************************************************************** **/ }
        <a
          className={
            this.state.openA ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ openA: !this.state.openA })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.openA ? 'menu-down' : 'menu-right'}
          />
          &nbsp;AXES
        </a>
        <Collapse in={this.state.openA}>
          <div>
            {axes}
          </div>
        </Collapse>
        <br />
        { /** ********************************************************************** **/
        /** ==============================> MARKERS <=============================== **/
        /** ********************************************************************** **/ }
        <a
          className={
            this.state.openM ?
            classNames(styles.collapseEvent, styles.active) :
            classNames(styles.collapseEvent)}
          onClick={() => this.setState({ openM: !this.state.openM })}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.openM ? 'menu-down' : 'menu-right'}
          />
          &nbsp;MARKERS
        </a>
        <Collapse in={this.state.openM}>
          <div className={classNames(styles.shift, styles.mt5)}>
            {markers}
          </div>
        </Collapse>
      </div>
    );
  }
}

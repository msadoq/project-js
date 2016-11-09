import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Glyphicon,
  Collapse,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from 'react-bootstrap';
import ToggleButton from './Buttons/ToggleButton';
import SelectButton from './Buttons/SelectButton';
import ColorPicker from './ColorPicker';
import SelectFontFamilySize from './SelectFontFamilySize';
import SelectFontStyle from './SelectFontStyle';
import PlotAxis from './PlotAxis';
import Marker from './Marker';
import styles from './PlotTab.css';
import select from './Select.css';


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
    title: PropTypes.string,
    axes: PropTypes.array,
    markers: PropTypes.array,
    grids: PropTypes.array,
    titleStyle: PropTypes.object,
    handleGrid: PropTypes.func,
    handlePlotTitle: PropTypes.func,
    handlePlotTitleStyle: PropTypes.func,
    handlePlotAxes: PropTypes.func,
    handlePlotMarkers: PropTypes.func
  }
  state = {
    openT: false
  };

  handleTitleStyle = (field, value) => this.props.handlePlotTitleStyle(field, value);
  handleTitle = e => this.props.handlePlotTitle(e.target.value);
  handleWidth = e => this.props.handleGrid('width', e.target.value);
  handleShow = state => this.props.handleGrid('showGrid', state === 'ON');
  handleAlign = val => this.props.handlePlotTitleStyle('align', val);
  handleLineStyle = val => this.props.handleGrid('lineStyle', val);
  handleYAxis = e => this.props.handleGrid('yAxisId', e.target.value);

  toggleOpenT = () => this.setState({ openT: !this.state.openT });
  toggleOpenA = () => this.setState({ openA: !this.state.openA });
  toggleOpenG = () => this.setState({ openG: !this.state.openG });
  toggleOpenM = () => this.setState({ openM: !this.state.openM });

  render() {
    const { openT, openA, openG, openM } = this.state;
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
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openT })}
          onClick={this.toggleOpenT}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={this.state.openT ? 'menu-down' : 'menu-right'}
          />
          {' '}TITLE
        </button>
        {openT && <Collapse in={openT}>
          <div className={classnames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Title
                </Col>
                <Col xs={8}>
                  <FormControl
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
        </Collapse>}
        <br />
        { /** ********************************************************************** **/
        /** ==============================> GRID <=============================== **/
        /** ********************************************************************** **/ }
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openG })}
          onClick={this.toggleOpenG}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={openG ? 'menu-down' : 'menu-right'}
          />
          {' '}GRID
        </button>
        {openG && <Collapse in={openG}>
          <div className={classnames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Show
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={'ON'}
                    off={'OFF'}
                    default={(this.props.grids[0].showGrid === true) ? 'ON' : 'OFF'}
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
                    active={this.props.grids[0].lineStyle}
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
                    value={this.props.grids[0].yAxisId}
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
                    type="number"
                    className={styles.input_xsmall}
                    value={this.props.grids[0].width}
                    onChange={this.handleWidth}
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Collapse>}
        <br />
        { /** ********************************************************************** **/
        /** ==============================> AXES <=============================== **/
        /** ********************************************************************** **/ }
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openA })}
          onClick={this.toggleOpenA}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={openA ? 'menu-down' : 'menu-right'}
          />
          {' '}AXES
        </button>
        {openA && <Collapse in={openA}>
          <div>
            {axes}
          </div>
        </Collapse>}
        <br />
        { /** ********************************************************************** **/
        /** ==============================> MARKERS <=============================== **/
        /** ********************************************************************** **/ }
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: openM })}
          onClick={this.toggleOpenM}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={openM ? 'menu-down' : 'menu-right'}
          />
          {' '}MARKERS
        </button>
        {openM && <Collapse in={openM}>
          <div className={classnames(styles.shift, styles.mt5)}>
            {markers}
          </div>
        </Collapse>}
      </div>
    );
  }
}

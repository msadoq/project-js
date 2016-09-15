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
import ToggleButton from './Buttons/ToggleButton.js';
import classNames from 'classnames';
import styles from './PlotTab.css';
import ColorPicker from './ColorPicker.js';
import SelectButton from './Buttons/SelectButton';
import SelectFontFamilySize from './SelectFontFamilySize.js';
import SelectFontStyle from './SelectFontStyle.js';

export default class PlotAxis extends React.Component {
  static propTypes = {
    idAxe: React.PropTypes.number,
    label: React.PropTypes.string,
    unit: React.PropTypes.string,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    autoLimits: React.PropTypes.bool,
    tickStep: React.PropTypes.number,
    autoTick: React.PropTypes.bool,
    showTicks: React.PropTypes.bool,
    showTickLabels: React.PropTypes.bool,
    isLogarithmic: React.PropTypes.bool,
    showAxis: React.PropTypes.bool,
    handlePlotAxes: React.PropTypes.func,
    style: React.PropTypes.object
  }
  constructor(...args) {
    super(...args);
    this.state = {
      label: this.props.label,
      unit: this.props.unit,
      min: this.props.min,
      max: this.props.max,
      autoLimits: this.props.autoLimits,
      tickStep: this.props.tickStep,
      autoTick: this.props.autoTick,
      showTicks: this.props.showTicks,
      showTickLabels: this.props.showTickLabels,
      isLogarithmic: this.props.isLogarithmic,
      showAxis: this.props.showAxis
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.handleMin = this.handleMin.bind(this);
    this.handleMax = this.handleMax.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.handleAutoLimit = this.handleAutoLimit.bind(this);
    this.handleAutoTick = this.handleAutoTick.bind(this);
    this.handleTickStep = this.handleTickStep.bind(this);
    this.handleShowTicks = this.handleShowTicks.bind(this);
    this.handleTicksLabel = this.handleTicksLabel.bind(this);
    this.handleLogarithmic = this.handleLogarithmic.bind(this);
    this.handleAxisStyle = this.handleAxisStyle.bind(this);
    this.handleAlign = this.handleAlign.bind(this);
  }
  handleAxisStyle(field, value) {
    this.props.handlePlotAxes(this.props.idAxe, `style.${field}`, value);
  }
  handleAlign(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'style.align', val);
  }
  handleShow(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'showAxis', val === 'ON');
  }
  handleLabel(e) {
    this.props.handlePlotAxes(this.props.idAxe, 'label', e.target.value);
  }
  handleMin(e) {
    this.props.handlePlotAxes(this.props.idAxe, 'min', e.target.value);
  }
  handleMax(e) {
    this.props.handlePlotAxes(this.props.idAxe, 'max', e.target.value);
  }
  handleUnit(e) {
    this.props.handlePlotAxes(this.props.idAxe, 'unit', e.target.value);
  }
  handleAutoLimit(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'autoLimits', val === 'ON');
  }
  handleAutoTick(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'autoTick', val === 'ON');
  }
  handleTickStep(e) {
    this.props.handlePlotAxes(this.props.idAxe, 'tickStep', e.target.value);
  }
  handleShowTicks(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'showTicks', val === 'ON');
  }
  handleTicksLabel(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'showTickLabels', val === 'ON');
  }
  handleLogarithmic(val) {
    this.props.handlePlotAxes(this.props.idAxe, 'isLogarithmic', val === 'ON');
  }
  render() {
    return (
      <div className={styles.AxesTreeSecLvl}>
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
          &nbsp;{this.props.label}
        </a>
        <Collapse in={this.state.open}>
          <div className={classNames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Label
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="text"
                    className={styles.input_xsmall}
                    value={this.props.label}
                    onChange={this.handleLabel}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Font
                </Col>
                <Col xs={8}>
                  <SelectFontFamilySize update={this.handleAxisStyle} />
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
                    update={this.handleAxisStyle}
                    bold={this.props.style.bold}
                    italic={this.props.style.italic}
                    underline={this.props.style.underline}
                    strikeout={this.props.style.strikeOut}
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
                  <ColorPicker color="#F5A623" onChange={this.handleAxisStyle} />
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
                    active={this.props.style.align}
                    buttons={[
                      { label: 'left', icon: 'alignLeft' },
                      { label: 'center', icon: 'alignCenter' },
                      { label: 'right', icon: 'alignRight' }
                    ]}
                    onChange={this.handleAlign}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Show
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.showAxis === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleShow}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Min
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="number"
                    className={styles.input_xsmall}
                    value={this.props.min}
                    onChange={this.handleMin}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Max
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="number"
                    className={styles.input_xsmall}
                    value={this.props.max}
                    onChange={this.handleMax}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Unit
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="text"
                    className={styles.input_xsmall}
                    value={this.props.unit}
                    onChange={this.handleUnit}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Auto Limit
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.autoLimits === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleAutoLimit}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Auto Tick
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.autoTick === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleAutoTick}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Tick step
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="number"
                    className={styles.input_xsmall}
                    value={this.props.tickStep}
                    onChange={this.handleTickStep}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Show ticks
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.showTicks === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleShowTicks}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Ticks label
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.showTickLabels === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleTicksLabel}
                  />
                </Col>
              </FormGroup>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Logarithmic
                </Col>
                <Col xs={8}>
                  <ToggleButton
                    on={"ON"}
                    off={"OFF"}
                    default={(this.props.isLogarithmic === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleLogarithmic}
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}

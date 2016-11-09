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
import styles from './PlotTab.css';
import ColorPicker from './ColorPicker';
import SelectButton from './Buttons/SelectButton';
import SelectFontFamilySize from './SelectFontFamilySize';
import SelectFontStyle from './SelectFontStyle';

export default class PlotAxis extends React.Component {
  static propTypes = {
    idAxe: PropTypes.number,
    label: PropTypes.string,
    unit: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    autoLimits: PropTypes.bool,
    tickStep: PropTypes.number,
    autoTick: PropTypes.bool,
    showTicks: PropTypes.bool,
    showTickLabels: PropTypes.bool,
    isLogarithmic: PropTypes.bool,
    showAxis: PropTypes.bool,
    handlePlotAxes: PropTypes.func,
    style: PropTypes.object
  }

  state = {
    open: false
  };

  handleAxisStyle = (field, value) => this.props.handlePlotAxes(this.props.idAxe, `style.${field}`, value);
  handleAlign = val => this.props.handlePlotAxes(this.props.idAxe, 'style.align', val);
  handleShow = val => this.props.handlePlotAxes(this.props.idAxe, 'showAxis', val === 'ON');
  handleLabel = e => this.props.handlePlotAxes(this.props.idAxe, 'label', e.target.value);
  handleMin = e => this.props.handlePlotAxes(this.props.idAxe, 'min', e.target.value);
  handleMax = e => this.props.handlePlotAxes(this.props.idAxe, 'max', e.target.value);
  handleUnit = e => this.props.handlePlotAxes(this.props.idAxe, 'unit', e.target.value);
  handleAutoLimit = val => this.props.handlePlotAxes(this.props.idAxe, 'autoLimits', val === 'ON');
  handleAutoTick = val => this.props.handlePlotAxes(this.props.idAxe, 'autoTick', val === 'ON');
  handleTickStep = e => this.props.handlePlotAxes(this.props.idAxe, 'tickStep', e.target.value);
  handleShowTicks = val => this.props.handlePlotAxes(this.props.idAxe, 'showTicks', val === 'ON');
  handleTicksLabel = val => this.props.handlePlotAxes(this.props.idAxe, 'showTickLabels', val === 'ON');
  handleLogarithmic = val => this.props.handlePlotAxes(this.props.idAxe, 'isLogarithmic', val === 'ON');
  toggleOpen = () => this.setState({ open: !this.state.open });

  render() {
    const {
      open
    } = this.state;
    const {
      label,
      unit,
      min,
      max,
      autoLimits,
      tickStep,
      autoTick,
      showTicks,
      showTickLabels,
      isLogarithmic,
      showAxis,
      style
    } = this.props;

    return (
      <div className={styles.AxesTreeSecLvl}>
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: open })}
          onClick={this.toggleOpen}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={open ? 'menu-down' : 'menu-right'}
          />
          {' '}{this.props.label}
        </button>
        {open && <Collapse in={open}>
          <div className={classnames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                <Col componentClass={ControlLabel} xs={4} className={styles.formLabel}>
                  Label
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="text"
                    className={styles.input_xsmall}
                    value={label}
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
                    bold={style.bold}
                    italic={style.italic}
                    underline={style.underline}
                    strikeout={style.strikeOut}
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
                    active={style.align}
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
                    on={'ON'}
                    off={'OFF'}
                    default={(showAxis === true) ? 'ON' : 'OFF'}
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
                    value={min}
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
                    value={max}
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
                    value={unit}
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
                    on={'ON'}
                    off={'OFF'}
                    default={(autoLimits === true) ? 'ON' : 'OFF'}
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
                    on={'ON'}
                    off={'OFF'}
                    default={(autoTick === true) ? 'ON' : 'OFF'}
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
                    value={tickStep}
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
                    on={'ON'}
                    off={'OFF'}
                    default={(showTicks === true) ? 'ON' : 'OFF'}
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
                    on={'ON'}
                    off={'OFF'}
                    default={(showTickLabels === true) ? 'ON' : 'OFF'}
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
                    on={'ON'}
                    off={'OFF'}
                    default={(isLogarithmic === true) ? 'ON' : 'OFF'}
                    size="xsmall"
                    styleOn="primary"
                    styleOff="warning"
                    onChange={this.handleLogarithmic}
                  />
                </Col>
              </FormGroup>
            </Form>
          </div>
        </Collapse>}
      </div>
    );
  }
}

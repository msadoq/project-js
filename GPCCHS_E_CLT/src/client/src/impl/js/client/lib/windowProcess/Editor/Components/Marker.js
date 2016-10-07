import React from 'react';
import { Glyphicon, Collapse, Form, FormGroup, Col, FormControl, InputGroup } from 'react-bootstrap';
import styles from './PlotTab.css';
import classNames from 'classnames';
import SelectFontFamilySize from './SelectFontFamilySize.js';
import SelectFontStyle from './SelectFontStyle.js';
import SelectButton from './Buttons/SelectButton';
import ColorPicker from './ColorPicker.js';
import select from './Select.css';

export default class Marker extends React.Component {
  static propTypes = {
    idAxe: React.PropTypes.number,
    kind: React.PropTypes.string,
    label: React.PropTypes.string,
    relPosX: React.PropTypes.number,
    relPosY: React.PropTypes.number,
    posX: React.PropTypes.number,
    posY: React.PropTypes.number,
    markerStyle: React.PropTypes.object,
    axes: React.PropTypes.array,
    handlePlotMarker: React.PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.handleType = this.handleType.bind(this);
    this.handleLabel = this.handleLabel.bind(this);
    this.handleAlign = this.handleAlign.bind(this);
    this.handleMarkerStyle = this.handleMarkerStyle.bind(this);
    this.handleLineStyle = this.handleLineStyle.bind(this);
    this.handleRelPosX = this.handleRelPosX.bind(this);
    this.handleRelPosY = this.handleRelPosY.bind(this);
    this.handlePosX = this.handlePosX.bind(this);
    this.handlePosY = this.handlePosY.bind(this);
  }
  handleType(e) {
    this.props.handlePlotMarker(this.props.idAxe, 'kind', e.target.value);
  }
  handleLabel(e) {
    this.props.handlePlotMarker(this.props.idAxe, 'label', e.target.value);
  }
  handleAlign(val) {
    this.props.handlePlotMarker(this.props.idAxe, 'style.align', val);
  }
  handleMarkerStyle(field, value) {
    this.props.handlePlotMarker(this.props.idAxe, `style.${field}`, value);
  }
  handleRelPosX(e) {
    this.props.handlePlotMarker(this.props.idAxe, 'relativePosX', e.target.value);
  }
  handleRelPosY(e) {
    this.props.handlePlotMarker(this.props.idAxe, 'relativePosY', e.target.value);
  }
  handlePosX(e) {
    this.props.handlePlotMarker(this.props.idAxe, 'posX', e.target.value);
  }
  handlePosY(e) {
    this.props.handlePlotMarker(this.props.idAxe, 'posY', e.target.value);
  }
  handleLineStyle(val) {
    this.props.handlePlotMarker(this.props.idAxe, 'style.lineStyle', val);
  }
  render() {
    return (
      <div>
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
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalType">
                <Col xs={4} className={styles.formLabel}>
                  Type
                </Col>
                <Col xs={8}>
                  <FormControl
                    componentClass="select"
                    className={styles.input_xsmall}
                    value={this.props.kind}
                    onChange={this.handleType}
                  >
                    <option value="Text">Text</option>
                    <option value="Horizontal">Horizontal</option>
                    <option value="Vertical">Vertical</option>
                    <option value="onePoint">One point - no implemented</option>
                    <option value="twoPoint">Two point - no implemented</option>
                  </FormControl>
                </Col>
              </FormGroup>
              {(this.props.kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalLabel">
                  <Col xs={4} className={styles.formLabel}>
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
                : null
              }
              {(this.props.kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                  <Col xs={4} className={styles.formLabel}>
                    Font
                  </Col>
                  <Col xs={8}>
                    <SelectFontFamilySize
                      update={this.handleMarkerStyle}
                      font={this.props.markerStyle.font}
                      size={this.props.markerStyle.size}
                    />
                  </Col>
                </FormGroup>
                  : null
              }
              {(this.props.kind === 'Text') ?
                <FormGroup
                  className={styles.formGroupXsmall}
                  controlId="formControlsSelect"
                >
                  <Col className={styles.formLabel} xs={4}>
                    Style
                  </Col>
                  <Col xs={8}>
                    <SelectFontStyle
                      update={this.handleMarkerStyle}
                      bold={this.props.markerStyle.bold}
                      italic={this.props.markerStyle.italic}
                      underline={this.props.markerStyle.underline}
                      strikeout={this.props.markerStyle.strikeOut}
                    />
                  </Col>
                </FormGroup>
              : null
            }
              <FormGroup
                className={styles.formGroupXsmall}
                controlId="formControlsSelect"
              >
                <Col className={styles.formLabel} xs={4}>
                  Color
                </Col>
                <Col xs={8}>
                  <ColorPicker color={this.props.markerStyle.colour} onChange={this.handleMarkerStyle} />
                </Col>
              </FormGroup>
              {(this.props.kind === 'Text') ?
                <FormGroup
                  className={styles.formGroupXsmall}
                  controlId="formControlsSelect"
                >
                  <Col className={styles.formLabel} xs={4}>
                    Align
                  </Col>
                  <Col xs={8}>
                    <SelectButton
                      size="xsmall"
                      active={this.props.markerStyle.align}
                      buttons={[
                        { label: 'left', icon: 'alignLeft' },
                        { label: 'center', icon: 'alignCenter' },
                        { label: 'right', icon: 'alignRight' }
                      ]}
                      onChange={this.handleAlign}
                    />
                  </Col>
                </FormGroup>
                : null
              }
              {(this.props.kind === 'Horizontal' || this.props.kind === 'Vertical') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
                  <Col xs={4} className={styles.formLabel}>
                    Line
                  </Col>
                  <Col xs={8}>
                    <SelectButton
                      size="xsmall"
                      active={this.props.lineStyle}
                      buttons={[
                        { label: 'Continuous', icon: 'continuous' },
                        { label: 'Dashed', icon: 'dashed' },
                        { label: 'Dotted', icon: 'doted' }
                      ]}
                      onChange={this.handleLineStyle}
                    />
                  </Col>
                </FormGroup>
                : null
              }
              {(this.props.kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalPosX">
                  <Col xs={4} className={styles.formLabel}>
                    rel. Pos X
                  </Col>
                  <Col xs={8}>
                    <InputGroup>
                      <FormControl
                        type="number"
                        className={styles.input_xsmall}
                        value={this.props.relPosX}
                        onChange={this.handleRelPosX}
                      />
                      <InputGroup.Addon className={styles.addon}>%</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                : null
              }
              {(this.props.kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalPosY">
                  <Col xs={4} className={styles.formLabel}>
                    rel. Pos Y
                  </Col>
                  <Col xs={8}>
                    <InputGroup>
                      <FormControl
                        type="number"
                        className={styles.input_xsmall}
                        value={this.props.relPosY}
                        onChange={this.handleRelPosY}
                      />
                      <InputGroup.Addon className={styles.addon}>%</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                : null
              }
              {(this.props.kind === 'Vertical') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalLabel">
                  <Col xs={4} className={styles.formLabel}>
                    Pos X
                  </Col>
                  <Col xs={8}>
                    <FormControl
                      type="number"
                      className={styles.input_xsmall}
                      value={this.props.posX}
                      onChange={this.handlePosX}
                    />
                  </Col>
                </FormGroup>
                : null
              }
              {(this.props.kind === 'Horizontal') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalLabel">
                  <Col xs={4} className={styles.formLabel}>
                    Pos Y
                  </Col>
                  <Col xs={8}>
                    <FormControl
                      type="number"
                      className={styles.input_xsmall}
                      value={this.props.posY}
                      onChange={this.handlePosY}
                    />
                  </Col>
                </FormGroup>
                : null
              }
              {(this.props.kind === 'Vertical') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
                  <Col className={styles.formLabel} xs={4}>
                    X Axis
                  </Col>
                  <Col xs={8}>
                    <FormControl componentClass="select" className={select.xsmall}>
                      {this.props.axes.map((axis, key) => {
                        return (
                          <option key={key}>{axis.label}</option>
                        );
                      })
                      }
                    </FormControl>
                  </Col>
                </FormGroup>
                : null
              }
               {(this.props.kind === 'Horizontal') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
                  <Col className={styles.formLabel} xs={4}>
                    Y Axis
                  </Col>
                  <Col xs={8}>
                    <FormControl componentClass="select" className={select.xsmall}>
                      {this.props.axes.map((axis, key) => {
                        return (
                          <option key={key}>{axis.label}</option>
                        );
                      })
                      }
                    </FormControl>
                  </Col>
                </FormGroup>
                : null
              }
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}

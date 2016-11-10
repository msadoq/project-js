import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Glyphicon, Collapse, Form, FormGroup, Col, FormControl, InputGroup } from 'react-bootstrap';
import styles from './Plot/PlotTab.css';
import SelectFontFamilySize from './SelectFontFamilySize';
import SelectFontStyle from './SelectFontStyle';
import SelectButton from './Buttons/SelectButton';
import ColorPicker from './ColorPicker';
import select from './Select.css';

export default class Marker extends React.Component {
  static propTypes = {
    idAxe: PropTypes.number,
    kind: PropTypes.string,
    label: PropTypes.string,
    relPosX: PropTypes.number,
    relPosY: PropTypes.number,
    posX: PropTypes.number,
    posY: PropTypes.number,
    markerStyle: PropTypes.object,
    lineStyle: PropTypes.object,
    axes: PropTypes.array,
    handlePlotMarker: PropTypes.func
  }

  state = {
    open: false
  };

  handleType = e => this.props.handlePlotMarker(this.props.idAxe, 'kind', e.target.value);
  handleLabel = e => this.props.handlePlotMarker(this.props.idAxe, 'label', e.target.value);
  handleAlign = val => this.props.handlePlotMarker(this.props.idAxe, 'style.align', val);
  handleMarkerStyle = (field, value) => this.props.handlePlotMarker(this.props.idAxe, `style.${field}`, value);
  handleRelPosX = e => this.props.handlePlotMarker(this.props.idAxe, 'relativePosX', e.target.value);
  handleRelPosY = e => this.props.handlePlotMarker(this.props.idAxe, 'relativePosY', e.target.value);
  handlePosX = e => this.props.handlePlotMarker(this.props.idAxe, 'posX', e.target.value);
  handlePosY = e => this.props.handlePlotMarker(this.props.idAxe, 'posY', e.target.value);
  handleLineStyle = val => this.props.handlePlotMarker(this.props.idAxe, 'style.lineStyle', val);

  toggleOpen = () => this.setState({ open: !this.state.open });

  render() {
    const {
      label, kind, markerStyle, lineStyle,
      relPosX, relPosY, posX, posY, axes
    } = this.props;
    const { open } = this.state;

    return (
      <div>
        <button
          className={classnames('btn-link', styles.collapseEvent, { [styles.active]: open })}
          onClick={this.toggleOpen}
        >
          <Glyphicon
            className={styles.glyphMenu}
            glyph={open ? 'menu-down' : 'menu-right'}
          />
          {' '}{label}
        </button>
        {open && <Collapse in={open}>
          <div className={classnames(styles.shift, styles.mt5)}>
            <Form horizontal>
              <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalType">
                <Col xs={4} className={styles.formLabel}>
                  Type
                </Col>
                <Col xs={8}>
                  <FormControl
                    componentClass="select"
                    className={styles.input_xsmall}
                    value={kind}
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
              {(kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalLabel">
                  <Col xs={4} className={styles.formLabel}>
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
                : null
              }
              {(kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalName">
                  <Col xs={4} className={styles.formLabel}>
                    Font
                  </Col>
                  <Col xs={8}>
                    <SelectFontFamilySize
                      update={this.handleMarkerStyle}
                      font={markerStyle.font}
                      size={markerStyle.size}
                    />
                  </Col>
                </FormGroup>
                  : null
              }
              {(kind === 'Text') ?
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
                      bold={markerStyle.bold}
                      italic={markerStyle.italic}
                      underline={markerStyle.underline}
                      strikeout={markerStyle.strikeOut}
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
                  <ColorPicker
                    color={markerStyle.colour}
                    onChange={this.handleMarkerStyle}
                  />
                </Col>
              </FormGroup>
              {(kind === 'Text') ?
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
                      active={markerStyle.align}
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
              {(kind === 'Horizontal' || kind === 'Vertical') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalCurve">
                  <Col xs={4} className={styles.formLabel}>
                    Line
                  </Col>
                  <Col xs={8}>
                    <SelectButton
                      size="xsmall"
                      active={lineStyle}
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
              {(kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalPosX">
                  <Col xs={4} className={styles.formLabel}>
                    rel. Pos X
                  </Col>
                  <Col xs={8}>
                    <InputGroup>
                      <FormControl
                        type="number"
                        className={styles.input_xsmall}
                        value={relPosX}
                        onChange={this.handleRelPosX}
                      />
                      <InputGroup.Addon className={styles.addon}>%</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                : null
              }
              {(kind === 'Text') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalPosY">
                  <Col xs={4} className={styles.formLabel}>
                    rel. Pos Y
                  </Col>
                  <Col xs={8}>
                    <InputGroup>
                      <FormControl
                        type="number"
                        className={styles.input_xsmall}
                        value={relPosY}
                        onChange={this.handleRelPosY}
                      />
                      <InputGroup.Addon className={styles.addon}>%</InputGroup.Addon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                : null
              }
              {(kind === 'Vertical') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalLabel">
                  <Col xs={4} className={styles.formLabel}>
                    Pos X
                  </Col>
                  <Col xs={8}>
                    <FormControl
                      type="number"
                      className={styles.input_xsmall}
                      value={posX}
                      onChange={this.handlePosX}
                    />
                  </Col>
                </FormGroup>
                : null
              }
              {(kind === 'Horizontal') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formHorizontalLabel">
                  <Col xs={4} className={styles.formLabel}>
                    Pos Y
                  </Col>
                  <Col xs={8}>
                    <FormControl
                      type="number"
                      className={styles.input_xsmall}
                      value={posY}
                      onChange={this.handlePosY}
                    />
                  </Col>
                </FormGroup>
                : null
              }
              {(kind === 'Vertical') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
                  <Col className={styles.formLabel} xs={4}>
                    X Axis
                  </Col>
                  <Col xs={8}>
                    <FormControl componentClass="select" className={select.xsmall}>
                      {axes.map((axis, key) => (
                        <option key={key}>{axis.label}</option>
                        ))
                      }
                    </FormControl>
                  </Col>
                </FormGroup>
                : null
              }
              {(kind === 'Horizontal') ?
                <FormGroup className={styles.formGroupXsmall} controlId="formControlsSelect">
                  <Col className={styles.formLabel} xs={4}>
                    Y Axis
                  </Col>
                  <Col xs={8}>
                    <FormControl componentClass="select" className={select.xsmall}>
                      {axes.map((axis, key) => (
                        <option key={key}>{axis.label}</option>
                        ))
                      }
                    </FormControl>
                  </Col>
                </FormGroup>
                : null
              }
            </Form>
          </div>
        </Collapse>}
      </div>
    );
  }
}

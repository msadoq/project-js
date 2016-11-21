import React, { PropTypes } from 'react';
import { Form, FormGroup, Col, FormControl, InputGroup } from 'react-bootstrap';
import SelectFontFamilySize from '../Selects/SelectFontFamilySize';
import SelectFontStyle from '../Selects/SelectFontStyle';
import SelectButton from '../Buttons/SelectButton';
import ColorPicker from '../ColorPicker';

const { Addon } = InputGroup;

export default class PlotMarker extends React.Component {
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

  handleType = e => this.props.handlePlotMarker(this.props.idAxe, 'kind', e.target.value);
  handleLabel = e => this.props.handlePlotMarker(this.props.idAxe, 'label', e.target.value);
  handleAlign = val => this.props.handlePlotMarker(this.props.idAxe, 'style.align', val);
  handleMarkerStyle = (field, value) => this.props.handlePlotMarker(this.props.idAxe, `style.${field}`, value);
  handleRelPosX = e => this.props.handlePlotMarker(this.props.idAxe, 'relativePosX', e.target.value);
  handleRelPosY = e => this.props.handlePlotMarker(this.props.idAxe, 'relativePosY', e.target.value);
  handlePosX = e => this.props.handlePlotMarker(this.props.idAxe, 'posX', e.target.value);
  handlePosY = e => this.props.handlePlotMarker(this.props.idAxe, 'posY', e.target.value);
  handleLineStyle = val => this.props.handlePlotMarker(this.props.idAxe, 'style.lineStyle', val);

  render() {
    const {
      label, kind, markerStyle, lineStyle,
      relPosX, relPosY, posX, posY, axes
    } = this.props;

    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalType">
          <Col xs={4} >
            Type
          </Col>
          <Col xs={8}>
            <FormControl
              componentClass="select"
              className="input-sm"
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
          <FormGroup controlId="formHorizontalLabel">
            <Col xs={4} >
              Label
            </Col>
            <Col xs={8}>
              <FormControl
                type="text"
                className="input-sm"
                value={label}
                onChange={this.handleLabel}
              />
            </Col>
          </FormGroup>
          : null
        }
        {(kind === 'Text') ?
          <FormGroup controlId="formHorizontalName">
            <Col xs={4} >
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
            controlId="formControlsSelect"
          >
            <Col xs={4}>
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
          controlId="formControlsSelect"
        >
          <Col xs={4}>
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
            controlId="formControlsSelect"
          >
            <Col xs={4}>
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
          <FormGroup controlId="formHorizontalCurve">
            <Col xs={4} >
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
          <FormGroup controlId="formHorizontalPosX">
            <Col xs={4} >
              rel. Pos X
            </Col>
            <Col xs={8}>
              <InputGroup>
                <FormControl
                  type="number"
                  className="input-sm"
                  value={relPosX}
                  onChange={this.handleRelPosX}
                />
                <Addon>%</Addon>
              </InputGroup>
            </Col>
          </FormGroup>
          : null
        }
        {(kind === 'Text') ?
          <FormGroup controlId="formHorizontalPosY">
            <Col xs={4} >
              rel. Pos Y
            </Col>
            <Col xs={8}>
              <InputGroup>
                <FormControl
                  type="number"
                  className="input-sm"
                  value={relPosY}
                  onChange={this.handleRelPosY}
                />
                <Addon>%</Addon>
              </InputGroup>
            </Col>
          </FormGroup>
          : null
        }
        {(kind === 'Vertical') ?
          <FormGroup controlId="formHorizontalLabel">
            <Col xs={4} >
              Pos X
            </Col>
            <Col xs={8}>
              <FormControl
                type="number"
                className="input-sm"
                value={posX}
                onChange={this.handlePosX}
              />
            </Col>
          </FormGroup>
          : null
        }
        {(kind === 'Horizontal') ?
          <FormGroup controlId="formHorizontalLabel">
            <Col xs={4} >
              Pos Y
            </Col>
            <Col xs={8}>
              <FormControl
                type="number"
                className="input-sm"
                value={posY}
                onChange={this.handlePosY}
              />
            </Col>
          </FormGroup>
          : null
        }
        {(kind === 'Vertical') ?
          <FormGroup controlId="formControlsSelect">
            <Col xs={4}>
              X Axis
            </Col>
            <Col xs={8}>
              <FormControl componentClass="select" >
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
          <FormGroup controlId="formControlsSelect">
            <Col xs={4}>
              Y Axis
            </Col>
            <Col xs={8}>
              <FormControl componentClass="select" >
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
    );
  }
}

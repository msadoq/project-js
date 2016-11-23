import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Form,
  InputGroup
} from 'react-bootstrap';
import {
  InputField
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from '../Forms/';
import {
  FormSectionFontStyle,
  FormSectionLineStyle
} from '../FormSections/';

const { Addon } = InputGroup;

class PlotMarker extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      kind: PropTypes.string,
      label: PropTypes.string,
      relativePosX: PropTypes.number,
      relativePosY: PropTypes.number,
      lineStyle: PropTypes.string,
      style: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string
      })
    }),
    isKindText: PropTypes.bool,
    isKindHorizontal: PropTypes.bool,
    isKindVertical: PropTypes.bool,
    isKindOnePoint: PropTypes.bool,
    isKindTwoPoint: PropTypes.bool,
    axes: PropTypes.array,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
  }

  static defaultProps = {
    initialValues: {
      kind: 'Text',
      label: '',
      relativePosX: 0,
      relativePosY: 0,
      lineStyle: 'Continuous',
      style: {
        font: 'Arial',
        size: 12,
        bold: false,
        italic: false,
        underline: false,
        strikeOut: false,
        align: 'left',
        colour: '#000000'
      }
    }
  }

  // handlePosX = e => this.props.handlePlotMarker(this.props.idAxe, 'posX', e.target.value);
  // handlePosY = e => this.props.handlePlotMarker(this.props.idAxe, 'posY', e.target.value);
  // handleLineStyle = val => this.props.handlePlotMarker(this.props.idAxe, 'style.lineStyle', val);

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      // axes,
      isKindText,
      isKindHorizontal,
      isKindVertical,
      // isKindOnePoint,
      // isKindTwoPoint
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Type">
          <Field
            name="kind"
            className="form-control input-sm"
            component="select"
          >
            <option value="Text">Text</option>
            <option value="Horizontal">Horizontal</option>
            <option value="Vertical">Vertical</option>
            <option value="onePoint">One point - no implemented</option>
            <option value="twoPoint">Two point - no implemented</option>
          </Field>
        </HorizontalFormGroup>


        {isKindHorizontal && <HorizontalFormGroup label="Line">
          <FormSectionLineStyle />
        </HorizontalFormGroup>}
        {isKindVertical && <HorizontalFormGroup label="Line">
          <FormSectionLineStyle />
        </HorizontalFormGroup>}

        {isKindText && <FormSectionFontStyle name="style" />}
        {isKindText && <HorizontalFormGroup label="rel. Pos X">
          <InputGroup>
            <Field
              name="relativePosX"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
            <Addon>%</Addon>
          </InputGroup>
        </HorizontalFormGroup>}
        {isKindText && <HorizontalFormGroup label="rel. Pos Y">
          <InputGroup>
            <Field
              name="relativePosY"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
            <Addon>%</Addon>
          </InputGroup>
        </HorizontalFormGroup>}

        {/*
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
        */}

        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
      </Form>
    );
  }
}

const requiredFields = ['label'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

export default connect((state, { formName }) => {
  const kind = formValueSelector(formName)(state, 'kind');

  return {
    isKindText: kind === 'Text',
    isKindHorizontal: kind === 'Horizontal',
    isKindVertical: kind === 'Vertical',
    isKindOnePoint: kind === 'onePoint',
    isKindTwoPoint: kind === 'twoPoint'
  };
})(
  reduxForm({
    validate,
    warn,
    enableReinitialize: true
  })(PlotMarker)
);

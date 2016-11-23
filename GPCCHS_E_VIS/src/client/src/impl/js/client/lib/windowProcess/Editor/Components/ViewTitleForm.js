import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  InputGroup,
  Col
} from 'react-bootstrap';
import {
  ButtonToggleField, ColorPickerField,
  SelectButtonField, SelectFontField, InputField
} from './Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from './Forms/';

const { Addon } = InputGroup;

class ViewTitleForm extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      title: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.boolean,
        italic: PropTypes.boolean,
        underline: PropTypes.boolean,
        strikeOut: PropTypes.boolean,
        align: PropTypes.string,
        color: PropTypes.string
      })
    }),
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
  }

  handleTitle = ({ target: { value: title } }) => {
    this.setState({ title });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Title">
          <Field
            name="title"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Font">
          <div className="row">
            <Col xs={6}>
              <Field
                name="titleStyle.font"
                component={SelectFontField}
                className="form-control input-sm"
                type="text"
              />
            </Col>
            <Col xs={6}>
              <InputGroup>
                <Field
                  name="titleStyle.size"
                  component={InputField}
                  normalize={value => parseInt(value, 10)}
                  className="form-control input-sm"
                  type="number"
                />
                <Addon>px</Addon>
              </InputGroup>
            </Col>
          </div>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Align">
          <Field
            component={SelectButtonField}
            name="titleStyle.align"
            buttons={[
              { label: 'left', icon: 'alignLeft' },
              { label: 'center', icon: 'alignCenter' },
              { label: 'right', icon: 'alignRight' }
            ]}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Style">
          <Field
            name="titleStyle.bold"
            component={ButtonToggleField}
            textOn="B"
            textOff="B"
          />
          <Field
            name="titleStyle.italic"
            component={ButtonToggleField}
            textOn="I"
            textOff="I"
          />
          <Field
            name="titleStyle.underline"
            component={ButtonToggleField}
            textOn="U"
            textOff="U"
          />
          <Field
            name="titleStyle.strikeOut"
            component={ButtonToggleField}
            textOn="S"
            textOff="S"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="titleStyle.colour"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>

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


const requiredFields = ['title'];
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

export default reduxForm({
  validate,
  warn,
  enableReinitialize: true
})(ViewTitleForm);

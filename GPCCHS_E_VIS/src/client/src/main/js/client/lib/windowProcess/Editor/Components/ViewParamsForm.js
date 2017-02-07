import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import {
  InputField,
  ColorPickerField,
} from './Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons,
} from './Forms/';
import {
  FormSectionFontStyle,
} from './FormSections/';

const bgColors = [
  '#FFFFFF', '#eceff1', '#fafafa', '#efebe9',
  '#fbe9e7', '#fff3e0', '#fff8e1', '#fffde7',
  '#f9fbe7', '#f1f8e9', '#e8f5e9', '#e0f2f1',
  '#e0f7fa', '#e1f5fe', '#e3f2fd', '#e8eaf6',
  '#ede7f6', '#f3e5f5', '#fce4ec', '#ffebee',
];

class ViewParamsForm extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string,
        bgColor: PropTypes.string,
      }),
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
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
      valid,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <div className="page-header">
          <h4>Title</h4>
        </div>
        <HorizontalFormGroup label="Title">
          <Field
            name="title"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <FormSectionFontStyle name="titleStyle" />

        <div className="page-header">
          <h4>Content</h4>
        </div>

        <HorizontalFormGroup label="Bg Color">
          <Field
            name="backgroundColor"
            component={ColorPickerField}
            colors={bgColors}
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
  enableReinitialize: true,
})(ViewParamsForm);

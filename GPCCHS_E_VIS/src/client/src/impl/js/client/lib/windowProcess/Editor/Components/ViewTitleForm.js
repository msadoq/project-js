import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form
} from 'react-bootstrap';
import {
  InputField
} from './Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from './Forms/';
import {
  FormSectionFontStyle
} from './FormSections/';

class ViewTitleForm extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      title: PropTypes.string,
      titleStyle: PropTypes.shape({
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

        <FormSectionFontStyle name="titleStyle" />

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

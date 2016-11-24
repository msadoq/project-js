import React, { PropTypes } from 'react';
import {
  Form
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {
  ColorPickerField
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from '../Forms/';
import {
  FormSectionLineStyle,
  FormSectionPointStyle
} from '../FormSections/';

class EntryPointStyle extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      lineStyle: PropTypes.string,
      pointsStyle: PropTypes.string,
      curveColour: PropTypes.string
    }).isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
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

        <HorizontalFormGroup label="Line">
          <FormSectionLineStyle />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Points">
          <FormSectionPointStyle />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="curveColour"
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

export default reduxForm({
  enableReinitialize: true
})(EntryPointStyle);

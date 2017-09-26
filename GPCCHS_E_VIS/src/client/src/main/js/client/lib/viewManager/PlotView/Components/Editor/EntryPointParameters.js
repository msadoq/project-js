// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Prefer precise named import over .. from 'index.js' import.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView, MimicView, DynamicView forms.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import ColorPickerField from '../../../../windowProcess/commonReduxForm/ColorPickerField';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import SelectButtonField from '../../../../windowProcess/commonReduxForm/SelectButtonField';
import FormSectionPointStyle from '../../../commonEditor/FormSections/FormSectionPointStyle';

const lineStyleButtons = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' },
];

class EntryPointParameters extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      line: PropTypes.shape({
        style: PropTypes.string,
        size: PropTypes.number,
      }).isRequired,
      points: PropTypes.shape({
        style: PropTypes.string,
        size: PropTypes.number,
      }).isRequired,
      curveColor: PropTypes.string,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
  }

  static defaultProps = {
    submitting: false,
    valid: false,
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
      <Form
        horizontal
        onSubmit={handleSubmit}
        className={classnames(
          { 'redux-form-dirty': !pristine },
          'redux-form-padded'
        )}
      >
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
        <div className="page-header">
          <h4>Name</h4>
        </div>
        <HorizontalFormGroup label="Label">
          <Field
            name="name"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>
        <div className="page-header">
          <h4>Style</h4>
        </div>
        <HorizontalFormGroup label="Line style">
          <Field
            component={SelectButtonField}
            name="line.style"
            buttons={lineStyleButtons}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Line size">
          <Field
            name="line.size"
            component={InputField}
            normalize={value => parseInt(value, 10)}
            className="form-control input-sm"
            type="number"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Points">
          <FormSectionPointStyle name="points" />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Points size">
          <Field
            name="points.size"
            component={InputField}
            normalize={value => parseInt(value, 10)}
            className="form-control input-sm"
            type="number"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="curveColor"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>
      </Form>
    );
  }
}

const requiredFields = ['name'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  enableReinitialize: true,
})(EntryPointParameters);

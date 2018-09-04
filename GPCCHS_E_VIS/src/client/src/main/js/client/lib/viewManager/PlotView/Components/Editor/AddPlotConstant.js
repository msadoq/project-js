import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _map from 'lodash/map';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';

import { validateRequiredFields } from '../../../common';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';
import ColorPickerField from '../../../../windowProcess/commonReduxForm/ColorPickerField';
import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';

class AddPlotConstant extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      label: PropTypes.string,
      showLabel: PropTypes.bool,
      style: PropTypes.object,
      value: PropTypes.string,
      axis: PropTypes.string,
      showConstant: PropTypes.bool,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired,
    axes: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    constants: {},
    axes: {},
  };

  computeAxesOptions = () => {
    const { axes } = this.props;
    return _map(axes, axe => ({ label: axe.label, value: axe.id }));
  };

  render() {
    const {
      handleSubmit,
      pristine,
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
        <HorizontalFormGroup label="Label">
          <Field
            name="label"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Value">
          <Field
            name="value"
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Axis">
          <Field
            name="axis"
            clearable={false}
            component={ReactSelectField}
            options={this.computeAxesOptions()}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Color">
          <Field
            name="style.color"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Show">
          <Field
            name="showConstant"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Show label">
          <Field
            name="showLabel"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          valid={valid}
        />
      </Form>
    );
  }
}

const requiredFields = ['label', 'value', 'axis'];
const validate = (values = {}) => validateRequiredFields(requiredFields, values);

export default connect(
  (state, { form }) =>
    ({
      label: formValueSelector(form)(state, 'label'),
      value: formValueSelector(form)(state, 'value'),
      axis: formValueSelector(form)(state, 'axis'),
    })
)(
  reduxForm({
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(AddPlotConstant)
);

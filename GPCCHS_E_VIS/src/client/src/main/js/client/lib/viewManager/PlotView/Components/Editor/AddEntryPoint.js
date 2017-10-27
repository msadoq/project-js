import React, { PropTypes, Component } from 'react';
import {
  Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';

class AddEntryPoint extends Component {

  componentDidMount() {
    setTimeout(this.props.reset, 0);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      valid,
      axes,
      axisId,
      unit,
    } = this.props;

    let filteredAxes;
    if (axes && unit) {
      filteredAxes = Object.keys(axes)
      .map(key => ({
        ...axes[key],
        axisId: key,
      })).filter(axis =>
        axis.unit === unit || axis.id === axisId
      );
    } else {
      filteredAxes = [];
    }

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Label">
          <Field
            name="name"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Unit">
          <Field
            name="connectedData.unit"
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
          {axes &&
            <p
              style={{ fontSize: '0.9em', paddingTop: '2px' }}
            >
              { Object.values(axes).map(a => `${a.label}: ${a.unit}`).join(', ') }
            </p>
          }
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Axis">
          <Field
            name="connectedData.axisId"
            clearable={false}
            component={ReactSelectField}
            options={
              filteredAxes.map(axis => ({
                label: axis.label,
                value: axis.axisId,
              })).concat({
                label: '-',
                value: '',
              })
            }
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

AddEntryPoint.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  axes: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  axisId: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

AddEntryPoint.defaultProps = {
  initialValues: { name: '' },
};

export default reduxForm({
  validate,
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        axisId: selector(state, 'connectedData.axisId'),
        unit: selector(state, 'connectedData.unit'),
      };
    }
  )(AddEntryPoint)
);

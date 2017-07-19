import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';
import SelectButtonField from '../../../../windowProcess/commonReduxForm/SelectButtonField';

const lineStyleButtons = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' },
];

class PlotGrid extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      xAxisId: PropTypes.string,
      yAxisId: PropTypes.string,
      showGrid: PropTypes.bool,
      line: PropTypes.shape({
        style: PropTypes.string,
        size: PropTypes.number,
      }),
    }).isRequired,
    axes: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    initialValues: {
      label: 'grid 1',
      xAxisId: null,
      yAxisId: null,
      line: {
        style: 'Continuous',
        size: 1,
      },
      showGrid: false,
    },
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      axes,
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
        <HorizontalFormGroup label="Show">
          <Field
            name="showGrid"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Line style">
          <Field
            component={SelectButtonField}
            name="line.style"
            buttons={lineStyleButtons}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Width">
          <Field
            name="line.size"
            component={InputField}
            normalize={value => parseFloat(value)}
            className="form-control input-sm"
            type="number"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="X Axis">
          <span>Time</span>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Y Axis">
          <Field
            name="yAxisId"
            className="form-control input-sm"
            component="select"
          >
            {
              Object.keys(axes)
              .filter(key => key !== 'time')
              .map(axisId =>
                <option key={axisId} value={axisId}>{axes[axisId].label}</option>
              )
            }
          </Field>
        </HorizontalFormGroup>
      </Form>
    );
  }
}

const requiredFields = [];
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
  warn: () => ({}),
  enableReinitialize: true,
})(PlotGrid);

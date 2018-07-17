// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Uniforming new EP process for PlotView and textView.
//  Fot PlotView EP, user might choose unit and axis in form to prevent VIMA from auto-creating Y
//  axis.
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : Resolved issue on empty ReactSelectFields, by
//  calling this.props.reset() onMount.
// VERSION : 2.0.0 : DM : #6835 : 27/10/2017 : Fixed issue with tooltip crashing when PlotView is
//  empty. Fixed small warning bug in PlotAxes editor.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0.2 : FA : #11609 : 20/04/2018 : correction plot view editeur unit + label(unit) +
//  test (cherry picked from commit 3c9fde0)
// VERSION : 2.0.0.3 : FA : ISIS-FT-3180 : 25/05/2018 : no more unit selection request on adding
//  new entry point
// VERSION : 2.0.0.3 : FA : ISIS-FT-3180 : 30/05/2018 : no more unit selection request on adding
//  new entry point
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

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
    } = this.props;

    let filteredAxes;
    if (axes) {
      filteredAxes = Object.keys(axes)
      .map(key => ({
        ...axes[key],
        axisId: key,
      }));
    } else {
      filteredAxes = Object.keys(axes)
        .map(key => ({
          ...axes[key],
          axisId: key,
        }));
    }

    return (
      <ErrorBoundary>
        <Form horizontal onSubmit={handleSubmit}>
          <HorizontalFormGroup label="Label">
            <Field
              name="name"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
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
      </ErrorBoundary>
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
      };
    }
  )(AddEntryPoint)
);

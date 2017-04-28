import React, { PropTypes } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  FieldArray,
  formValueSelector,
} from 'redux-form';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import TextareaField from '../../../../windowProcess/commonReduxForm/TextareaField';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';
import FiltersFields from '../../../commonEditor/Fields/FiltersFields';

/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
const EntryPointConnectedData = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    valid,
    axes,
    timelines,
    unit,
    axisId,
  } = props;

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
      <div>
        <HorizontalFormGroup label="Formula">
          <Field
            name="formula"
            component={TextareaField}
            rows="4"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Field X">
          <Field
            name="fieldX"
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Unit">
          <Field
            name="unit"
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

        <HorizontalFormGroup label="Domain">
          <Field
            name="domain"
            component={InputField}
            type="text"
            className="form-control input-sm"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <Field
            name="timeline"
            clearable={false}
            component={ReactSelectField}
            free
            options={timelines.map(t =>
              ({
                label: t.id,
                value: t.id,
              })
            ).concat({
              label: '*',
              value: '*',
            })}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Axis">
          <Field
            name="axisId"
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

        <FieldArray
          name="filter"
          component={FiltersFields}
        />
      </div>

      <ClearSubmitButtons
        pristine={pristine}
        submitting={submitting}
        reset={reset}
        valid={valid}
      />
    </Form>
  );
};

EntryPointConnectedData.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
  initialValues: PropTypes.shape({
    axisId: PropTypes.string,
    digit: PropTypes.number,
    domain: PropTypes.string,
    filter: PropTypes.arrayOf(PropTypes.shape({
      field: PropTypes.string,
      operand: PropTypes.string,
      operator: PropTypes.string,
    })),
    format: PropTypes.string,
    formula: PropTypes.string,
    fieldX: PropTypes.string,
    timeline: PropTypes.string,
    unit: PropTypes.string,
  }).isRequired,
  axes: PropTypes.shape({}).isRequired,
  timelines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool.isRequired,
  axisId: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

EntryPointConnectedData.defaultProps = {
  submitting: false,
};

const requiredFields = [
  'fieldX',
  'formula',
  'timeline',
];

const validate = (values = {}) => {
  const errors = {};
  requiredFields.forEach((fieldPath) => {
    if (!_get(values, fieldPath)) {
      _set(errors, fieldPath, 'Required');
    }
  });

  return errors;
};

export default reduxForm({
  validate,
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        axisId: selector(state, 'axisId'),
        unit: selector(state, 'unit'),
      };
    }
  )(EntryPointConnectedData)
);

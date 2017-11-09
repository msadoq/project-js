import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';
import * as constants from '../../../../constants';

const MODES = [
  { value: constants.GMA_ALARM_MODE_ALL, label: 'All' },
  { value: constants.GMA_ALARM_MODE_NONNOMINAL, label: 'Non nominal' },
  { value: constants.GMA_ALARM_MODE_TOACKNOWLEDGE, label: 'To Acknowledge' },
];

class EntryPointConnectedData extends Component {
  componentDidMount() {
    setTimeout(this.props.reset, 0);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      timelines,
      domains,
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
        <br />
        <HorizontalFormGroup label="Domain">
          <Field
            name="domain"
            clearable={false}
            component={ReactSelectField}
            options={domains.map(d =>
              ({
                label: d.name,
                value: d.name,
              })
            ).concat({
              label: '*',
              value: '*',
            })}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Timeline">
          <Field
            name="timeline"
            clearable={false}
            component={ReactSelectField}
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

        <HorizontalFormGroup label="Mode">
          <Field
            name="mode"
            clearable={false}
            component={ReactSelectField}
            options={MODES}
          />
        </HorizontalFormGroup>
      </Form>
    );
  }
}

EntryPointConnectedData.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
  initialValues: PropTypes.shape({
    formula: PropTypes.string,
    domain: PropTypes.string,
    timeline: PropTypes.string,
  }).isRequired,
  timelines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

const requiredFields = [/* 'formula', 'domain', 'timeline' */];
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
})(EntryPointConnectedData);

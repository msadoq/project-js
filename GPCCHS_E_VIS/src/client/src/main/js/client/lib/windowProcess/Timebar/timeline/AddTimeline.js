import React, { PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { reduxForm } from 'redux-form';
import TimelineFields from './TimelineFields';
import {
  ClearSubmitButtons,
} from '../../Editor/Components/Forms/';

const AddTimeline = (props) => {
  const {
    sessions,
    timelines,
    pristine,
    submitting,
    reset,
    valid,
    handleSubmit,
  } = props;
  return (
    <Form horizontal onSubmit={handleSubmit}>
      <TimelineFields
        sessions={sessions}
        timelines={timelines}
      />
      <ClearSubmitButtons
        pristine={pristine}
        submitting={submitting}
        reset={reset}
        valid={valid}
      />
    </Form>
  );
};
AddTimeline.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  timelines: PropTypes.arrayOf(PropTypes.object).isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};

const requiredFields = ['id', 'sessionId'];
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
})(AddTimeline);

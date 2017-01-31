import React, { PureComponent, PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { reduxForm } from 'redux-form';
import TimelineFields from './TimelineFields';
import {
  ClearSubmitButtons
} from '../../Editor/Components/Forms/';

class AddTimeline extends PureComponent {

  static propTypes = {
    initialValues: PropTypes.shape({
      kind: PropTypes.string,
      sessionId: PropTypes.string,
      id: PropTypes.string,
      color: PropTypes.string,
      master: PropTypes.bool,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    timelines: PropTypes.array.isRequired,
    sessions: PropTypes.array.isRequired,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
  }

  render() {
    const {
      sessions,
      timelines,
      pristine,
      submitting,
      reset,
      valid,
      handleSubmit,
    } = this.props;

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
  }
}

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
  enableReinitialize: true
})(AddTimeline);

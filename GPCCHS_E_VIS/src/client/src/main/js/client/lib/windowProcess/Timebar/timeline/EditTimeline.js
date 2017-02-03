// import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { Form } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import TimelineFields from './TimelineFields';
import {
  ClearSubmitButtons
} from '../../Editor/Components/Forms/';

class EditTimeline extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    sessions: PropTypes.array.isRequired,
    timelines: PropTypes.array.isRequired,
    masterId: PropTypes.string,
    id: PropTypes.string.isRequired,
    timelineId: PropTypes.string.isRequired,
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
      masterId,
      id,
      timelineId,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>

        <TimelineFields
          sessions={sessions}
          timelines={timelines}
          masterId={masterId}
          timelineId={timelineId}
          id={id}
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
})(EditTimeline);

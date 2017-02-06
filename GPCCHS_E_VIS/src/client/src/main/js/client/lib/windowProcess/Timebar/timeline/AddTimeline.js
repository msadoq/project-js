import React, { PureComponent, PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { reduxForm } from 'redux-form';
import TimelineFields from './TimelineFields';
import {
  ClearSubmitButtons,
} from '../../Editor/Components/Forms/';

class AddTimeline extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        timelineId: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
      })
    ).isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        delta: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        missionEpoch: PropTypes.number.isRequired,
        timestamp: PropTypes.shape({
          ms: PropTypes.number,
          ps: PropTypes.number,
        }),
      })
    ).isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
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
  enableReinitialize: true,
})(AddTimeline);

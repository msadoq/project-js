// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { reduxForm } from 'redux-form';
import TimelineFields from './TimelineFields';

class AddTimeline extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionName: PropTypes.string.isRequired,
      })
    ).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  };

  state = {
    disableSubmit: false,
  }

  disableSubmit = (flag) => {
    this.setState({
      disableSubmit: flag,
    });
  }

  render() {
    const {
      sessions,
      timelines,
      pristine,
      submitting,
      valid,
      handleSubmit,
    } = this.props;
    const { disableSubmit } = this.state;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <TimelineFields
          sessions={sessions}
          timelines={timelines}
          disableSubmit={this.disableSubmit}
        />
        <div className="text-right">
          <ButtonGroup>
            <Button
              bsStyle="success"
              type="submit"
              disabled={pristine || submitting || !valid || disableSubmit}
            >
              Submit
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    );
  }
}

const requiredFields = ['id', 'sessionName'];
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

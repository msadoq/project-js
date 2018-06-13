// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in
//  windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// END-HISTORY
// ====================================================================

// import moment from 'moment';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _set from 'lodash/set';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import TimelineFields from './TimelineFields';
import { sessionType, timelinesType } from '../../../viewManager/common/Components/types';

class EditTimeline extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    timelines: timelinesType.isRequired,
    sessions: PropTypes.arrayOf(sessionType).isRequired,
    masterId: PropTypes.string,
    id: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    masterId: null,
  }

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
      masterId,
      id,
      uuid,
    } = this.props;
    const { disableSubmit } = this.state;

    return (
      <Form horizontal onSubmit={handleSubmit}>

        <TimelineFields
          sessions={sessions}
          timelines={timelines}
          masterId={masterId}
          uuid={uuid}
          id={id}
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
})(EditTimeline);

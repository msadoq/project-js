// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu
//  Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// END-HISTORY
// ====================================================================

// import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import classnames from 'classnames';
import { reduxForm, Field } from 'redux-form';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import InputField from '../commonReduxForm/InputField';
import HorizontalFormGroup from '../commonReduxForm/HorizontalFormGroup';

class EditWindow extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    windows: PropTypes.shape().isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    masterId: null,
  }

  render() {
    const {
      pristine,
      uuid,
      submitting,
      valid,
      windows,
      handleSubmit,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>

        <HorizontalFormGroup label="Title">
          <Field
            name="title"
            component={InputField}
            type="text"
            className={classnames('form-control', 'pt15', 'pb15')}
            validate={(val) => {
              if (
                Object.keys(windows).find(uid =>
                  windows[uid].title === val && windows[uid].uuid !== uuid
                )
              ) {
                return 'This title is already taken';
              }
              return undefined;
            }}
          />
        </HorizontalFormGroup>
        <div className="text-right">
          <ButtonGroup>
            <Button
              bsStyle="success"
              type="submit"
              disabled={pristine || submitting || !valid}
            >
              Submit
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    );
  }
}

const requiredFields = ['uuid', 'title'];
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
})(EditWindow);

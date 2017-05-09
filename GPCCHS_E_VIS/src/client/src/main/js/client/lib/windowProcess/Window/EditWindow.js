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
import ReactSelectField from '../commonReduxForm/ReactSelectField';
import HorizontalFormGroup from '../commonReduxForm/HorizontalFormGroup';

class EditWindow extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    windows: PropTypes.shape().isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
      domains,
      sessions,
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
        <HorizontalFormGroup label="Domain Name">
          <Field
            name="domainName"
            component={ReactSelectField}
            free
            clearable
            options={domains.map(domain =>
              ({
                label: domain.name,
                value: domain.name,
              })
            )}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Session Name">
          <Field
            name="sessionName"
            component={ReactSelectField}
            free
            clearable
            options={sessions.map(session =>
              ({
                label: session.name,
                value: session.name,
              })
            )}
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

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
import ReactSelectField from '../commonReduxForm/ReactSelectField';

class EditPage extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    pages: PropTypes.shape().isRequired,
    initialValues: PropTypes.shape().isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    masterId: null,
    domainName: null,
    sessionName: null,
  }

  state = {
    domain: null,
    session: null,
  }

  componentDidMount() {
    // Only one ReactSelectField works without this re-render
    setTimeout(this.props.reset, 0);
  }

  newDomain = (domain) => {
    this.setState({ domain });
  }

  newSession = (session) => {
    this.setState({ session });
  }

  render() {
    const {
      pristine,
      uuid,
      submitting,
      valid,
      pages,
      handleSubmit,
      domains,
      sessions,
      initialValues: { sessionName, domainName },
    } = this.props;
    const {
      domain,
      session,
    } = this.state;

    return (
      <Form horizontal onSubmit={handleSubmit}>

        <HorizontalFormGroup label="Title">
          <Field
            name="title"
            component={InputField}
            className={classnames('form-control', 'pt15', 'pb15')}
            type="text"
            validate={(val) => {
              if (
                Object.keys(pages).find(uid => pages[uid].title === val && pages[uid].uuid !== uuid)
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
            onInputChange={this.newDomain}
            clearable
            options={
              domains.map(s =>
                ({
                  label: s.name,
                  value: s.name,
                })
              )
              .concat(
                domain && !domains.find(s => s.name === domain) ?
                { label: domain, value: domain } : []
              )
              .concat(
                domainName && !domains.find(s => s.name === domainName) ?
                { label: domainName, value: domainName } : []
              )
            }
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Session Name">
          <Field
            name="sessionName"
            component={ReactSelectField}
            onInputChange={this.newSession}
            clearable
            options={
              sessions.map(s =>
                ({
                  label: s.name,
                  value: s.name,
                })
              )
              .concat(
                session && !sessions.find(s => s.name === session) ?
                { label: session, value: session } : []
              )
              .concat(
                sessionName && !sessions.find(s => s.name === sessionName) ?
                { label: sessionName, value: sessionName } : []
              )
            }
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

const requiredFields = [];
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
})(EditPage);

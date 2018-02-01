// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName from GUI for view, page, window and workspace
// END-HISTORY
// ====================================================================

// import moment from 'moment';
import React, { PureComponent, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import HorizontalFormGroup from '../commonReduxForm/HorizontalFormGroup';
import ReactSelectField from '../commonReduxForm/ReactSelectField';

class EditWorkspace extends PureComponent {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    initialValues: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    masterId: null,
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
      submitting,
      valid,
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
        <HorizontalFormGroup label="Domain Name">
          <Field
            name="domainName"
            component={ReactSelectField}
            clearable
            onInputChange={this.newDomain}
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

export default reduxForm({
  enableReinitialize: true,
})(EditWorkspace);

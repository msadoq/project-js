// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 2.0.0 : FA : ISIS-FT-2248 : 18/10/2017 : Fallback/Wildcard for sessions and domains is
//  now functionnal. Plus fixed page and workspace modal editor for undefined values.
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

// import moment from 'moment';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
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
    domain: '*',
    session: '*',
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
      session,
      domain,
    } = this.state;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Domain Name">
          <Field
            name="domainName"
            component={ReactSelectField}
            clearable
            onInputChange={this.newDomain}
            options={computeOptions(domains, true)}
            value={domainName || domain}
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Session Name">
          <Field
            name="sessionName"
            component={ReactSelectField}
            onInputChange={this.newSession}
            clearable
            options={computeOptions(sessions, true)}
            value={sessionName || session}
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

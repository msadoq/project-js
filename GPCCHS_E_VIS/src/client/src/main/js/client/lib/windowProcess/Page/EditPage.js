// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and
//  GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu
//  Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 2.0.0 : FA : #8123 : 27/09/2017 : Fixed redux-form bug with a delay before render in
//  EditPage.
// VERSION : 2.0.0 : FA : #8123 : 27/09/2017 : free attribute on ReactSelectFIeld disappears. Every
//  session/domain form in vima is fixed and works (page, view).
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

// import moment from 'moment';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import { computeOptions } from '../../viewManager/commonEditor/Fields/common';

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

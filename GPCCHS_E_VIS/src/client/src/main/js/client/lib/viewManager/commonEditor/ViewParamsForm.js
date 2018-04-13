// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : importing exact path instead of .. from index.js .
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Collapsed view : SAVE here when isModified: true,
//  bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Collapsed view : SAVE here when isModified: true,
//  bolds in editor, eslint-disable with reason, colors for bgcolor are full colors.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : Resolved issue on empty ReactSelectFields, by
//  calling this.props.reset() onMount.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 2.0.0 : FA : #8123 : 27/09/2017 : free attribute on ReactSelectFIeld disappears. Every
//  session/domain form in vima is fixed and works (page, view).
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ColorPickerField from 'windowProcess/commonReduxForm/ColorPickerField';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import FormSectionFontStyle from './FormSections/FormSectionFontStyle';
import { computeOptions } from '../../viewManager/commonEditor/Fields/common';

class ViewParamsForm extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      sessionName: PropTypes.string,
      domainName: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string,
        bgColor: PropTypes.string,
      }),
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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

  handleTitle = ({ target: { value: title } }) => {
    this.setState({ title });
  }


  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      domains,
      sessions,
      initialValues: { domainName, sessionName },
    } = this.props;
    const {
      domain,
      session,
    } = this.state;

    return (
      <Form
        horizontal
        onSubmit={handleSubmit}
        className={classnames(
          { 'redux-form-dirty': !pristine },
          'redux-form-padded'
        )}
      >
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
        <div className="page-header">
          <h4>Title</h4>
        </div>
        <HorizontalFormGroup label="Title">
          <Field
            name="title"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <FormSectionFontStyle name="titleStyle" />

        <div className="page-header">
          <h4>Content</h4>
        </div>

        <HorizontalFormGroup label="Bg Color">
          <Field
            name="backgroundColor"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>

        <div className="page-header">
          <h4>Configuration</h4>
        </div>
        <HorizontalFormGroup label="Domain Name">
          <Field
            name="domainName"
            component={ReactSelectField}
            onInputChange={this.newDomain}
            clearable
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
      </Form>
    );
  }
}


const requiredFields = ['title'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  warn: () => ({}),
  enableReinitialize: true,
})(ViewParamsForm);

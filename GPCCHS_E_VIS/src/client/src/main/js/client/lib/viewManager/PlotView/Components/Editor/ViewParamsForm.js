// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : Resolved issue on empty ReactSelectFields, by calling this.props.reset() onMount.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView, MimicView, DynamicView forms.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from '../../../../windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from '../../../../windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from '../../../../windowProcess/commonReduxForm/InputField';
import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';
import ColorPickerField from '../../../../windowProcess/commonReduxForm/ColorPickerField';
import FormSectionFontStyle from '../../../commonEditor/FormSections/FormSectionFontStyle';
import ReactSelectField from '../../../../windowProcess/commonReduxForm/ReactSelectField';

class ViewParamsForm extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      showLegend: PropTypes.bool.isRequired,
      legend: PropTypes.shape({
        location: PropTypes.string,
      }).isRequired,
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

  componentDidMount() {
    setTimeout(this.props.reset, 0);
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
    } = this.props;

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
          <h4>Legend</h4>
        </div>
        <HorizontalFormGroup label="Show">
          <Field
            name="showLegend"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Location">
          <Field
            name="legend.location"
            component="select"
            className="form-control input-sm"
          >
            <option value="top">Top</option>
            <option value="right">Right</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
          </Field>
        </HorizontalFormGroup>
        <div className="page-header">
          <h4>Configuration</h4>
        </div>
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

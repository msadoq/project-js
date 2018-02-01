// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Prefer precise named import over .. from 'index.js' import.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView, MimicView, DynamicView forms.
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import ColorPickerField from 'windowProcess/commonReduxForm/ColorPickerField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import SelectButtonField from 'windowProcess/commonReduxForm/SelectButtonField';
import FormSectionPointStyle from 'viewManager/commonEditor/FormSections/FormSectionPointStyle';
import ButtonToggleField from '../../../../windowProcess/commonReduxForm/ButtonToggleField';

const lineStyleButtons = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' },
];

const { shape, string, number, bool, func } = PropTypes;

class EntryPointParameters extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: shape({
      line: shape({
        style: string,
        size: number,
      }).isRequired,
      points: shape({
        style: string,
        size: number,
      }).isRequired,
      curveColor: string,
    }).isRequired,
    handleSubmit: func.isRequired,
    pristine: bool.isRequired,
    reset: func.isRequired,
    submitting: bool,
    valid: bool,
    displayLine: bool,
    displayPoints: bool,
  };
  static defaultProps = {
    submitting: false,
    valid: false,
    displayLine: true,
    displayPoints: true,
  };

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      displayLine,
      displayPoints,
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
          <h4>Name</h4>
        </div>
        <HorizontalFormGroup label="Label">
          <Field
            name="name"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Color">
          <Field
            name="curveColor"
            component={ColorPickerField}
          />
        </HorizontalFormGroup>

        <div className="page-header">
          <h4>Line Style</h4>
        </div>
        <HorizontalFormGroup label="Visible">
          <Field
            name="displayLine"
            component={ButtonToggleField}
            textOn="YES"
            textOff="NO"
            styleOff="warning"
          />
        </HorizontalFormGroup>
        {
          displayLine &&
          <HorizontalFormGroup label="Line style">
            <Field
              component={SelectButtonField}
              name="line.style"
              buttons={lineStyleButtons}
            />
          </HorizontalFormGroup>
        }
        {
          displayLine &&
          <HorizontalFormGroup label="Line size">
            <Field
              name="line.size"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
          </HorizontalFormGroup>
        }

        <div className="page-header">
          <h4>Points Style</h4>
        </div>
        <HorizontalFormGroup label="Visible">
          <Field
            name="displayPoints"
            component={ButtonToggleField}
            textOn="YES"
            textOff="NO"
            styleOff="warning"
          />
        </HorizontalFormGroup>
        {
          displayPoints &&
          <HorizontalFormGroup label="Points">
            <FormSectionPointStyle name="points" />
          </HorizontalFormGroup>
        }
        {
          displayPoints &&
          <HorizontalFormGroup label="Points size">
            <Field
              name="points.size"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
          </HorizontalFormGroup>
        }
      </Form>
    );
  }
}

const requiredFields = ['name'];
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
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        displayLine: selector(state, 'displayLine'),
        displayPoints: selector(state, 'displayPoints'),
      };
    }
  )(EntryPointParameters)
);

// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Prefer precise named import over .. from 'index.js' import.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// END-HISTORY
// ====================================================================

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import FormSectionFontStyle from 'viewManager/commonEditor/FormSections/FormSectionFontStyle';
import FormSectionLineStyle from 'viewManager/commonEditor/FormSections/FormSectionLineStyle';

const { Addon } = InputGroup;

class PlotMarker extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      kind: PropTypes.string,
      label: PropTypes.string,
      relativePosX: PropTypes.number,
      relativePosY: PropTypes.number,
      lineStyle: PropTypes.string,
      style: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string,
      }),
    }).isRequired,
    isKindText: PropTypes.bool.isRequired,
    isKindHorizontal: PropTypes.bool.isRequired,
    isKindVertical: PropTypes.bool.isRequired,
    // isKindOnePoint: PropTypes.bool,
    // isKindTwoPoint: PropTypes.bool,
    // axes: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    initialValues: {
      kind: 'Text',
      label: '',
      relativePosX: 0,
      relativePosY: 0,
      lineStyle: 'Continuous',
      style: {
        font: 'Arial',
        size: 12,
        bold: false,
        italic: false,
        underline: false,
        strikeOut: false,
        align: 'left',
        color: '#000000',
      },
    },
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      // axes,
      isKindText,
      isKindHorizontal,
      isKindVertical,
      // isKindOnePoint,
      // isKindTwoPoint
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Type">
          <Field
            name="kind"
            className="form-control input-sm"
            component="select"
          >
            <option value="Text">Text</option>
            <option value="Horizontal">Horizontal</option>
            <option value="Vertical">Vertical</option>
            <option value="onePoint">One point - no implemented</option>
            <option value="twoPoint">Two point - no implemented</option>
          </Field>
        </HorizontalFormGroup>


        {isKindHorizontal && <HorizontalFormGroup label="Line">
          <FormSectionLineStyle name="line" />
        </HorizontalFormGroup>}
        {isKindVertical && <HorizontalFormGroup label="Line">
          <FormSectionLineStyle name="line" />
        </HorizontalFormGroup>}

        {isKindText && <FormSectionFontStyle name="style" />}
        {isKindText && <HorizontalFormGroup label="rel. Pos X">
          <InputGroup>
            <Field
              name="relativePosX"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
            <Addon>%</Addon>
          </InputGroup>
        </HorizontalFormGroup>}
        {isKindText && <HorizontalFormGroup label="rel. Pos Y">
          <InputGroup>
            <Field
              name="relativePosY"
              component={InputField}
              normalize={value => parseInt(value, 10)}
              className="form-control input-sm"
              type="number"
            />
            <Addon>%</Addon>
          </InputGroup>
        </HorizontalFormGroup>}
        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
      </Form>
    );
  }
}

const requiredFields = ['label'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default connect((state, { formName }) => {
  const kind = formValueSelector(formName)(state, 'kind');

  return {
    isKindText: kind === 'Text',
    isKindHorizontal: kind === 'Horizontal',
    isKindVertical: kind === 'Vertical',
    isKindOnePoint: kind === 'onePoint',
    isKindTwoPoint: kind === 'twoPoint',
  };
})(
  reduxForm({
    validate,
    warn: () => ({}),
    enableReinitialize: true,
  })(PlotMarker)
);

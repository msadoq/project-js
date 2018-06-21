// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #6785 : 13/06/2017 : Fix path writing after choice
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only
//  path for link definition
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from 'windowProcess/commonReduxForm/InputField';
import FileInputField from 'windowProcess/commonReduxForm/FileInputField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import { validateRequiredFields } from '../../common';

class AddLink extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    }),
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Supported by ReduxForm HOC"
    change: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    myFormKey: PropTypes.string.isRequired,
  };

  static defaultProps = {
    initialValues: { name: '', path: '' },
  };

  changePath = (val) => {
    this.props.change('path', val);
  };

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      valid,
      reset,
      myFormKey,
    } = this.props;

    return (
      <ErrorBoundary>
        <Form
          key={myFormKey}
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
            valid={valid}
            reset={reset}
          />
          <br />
          <HorizontalFormGroup label="Label">
            <Field
              name="name"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Path">
            <Field
              name="path"
              changePath={this.changePath}
              component={FileInputField}
              onHandleSubmit={handleSubmit}
              myFormKey={myFormKey}
            />
          </HorizontalFormGroup>
        </Form>
      </ErrorBoundary>
    );
  }
}

const requiredFields = ['name', 'path'];

export default reduxForm({
  validate: validateRequiredFields(requiredFields),
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        name: selector(state, 'name'),
        path: selector(state, 'path'),
      };
    }
  )(AddLink)
);

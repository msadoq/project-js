import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form
} from 'react-bootstrap';
import { lint } from '../../../lib/common/htmllint';
import {
  CodeMirrorField
} from '../../../lib/windowProcess/Editor/Components/Fields';
import {
  ClearSubmitButtons
} from '../../../lib/windowProcess/Editor/Components/Forms/';
import styles from './WYSIWYG.css';

class WYSIWYG extends Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      html: PropTypes.string
    }),
    entryPoints: PropTypes.array,
    onChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
    initialize: PropTypes.func,
    asyncValidating: PropTypes.bool,
    asyncValidate: PropTypes.func,
  }

  onChange = editorState => this.setState({ editorState });

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      entryPoints,
      asyncValidating,
      asyncValidate,
    } = this.props;

    return (
      <div className={styles.root}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Field
            name="html"
            className={styles.CodeMirrorField}
            component={CodeMirrorField}
            autocompleteList={entryPoints}
            asyncValidate={asyncValidate}
            type="test"
          />

          <ClearSubmitButtons
            asyncValidating={asyncValidating}
            pristine={pristine}
            submitting={submitting}
            reset={reset}
            valid={valid}
          />
        </Form>
      </div>
    );
  }
}

const requiredFields = ['html'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  const htmlErrors = lint(values.html);
  if (htmlErrors.length) {
    errors.html = `You have ${htmlErrors.length} errors`;
  }
  return errors;
};

export default reduxForm({
  validate,
  enableReinitialize: false,
  asyncBlurFields: ['html']
})(WYSIWYG);

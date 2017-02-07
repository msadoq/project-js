import React, { PureComponent, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import { lint } from '../../../common/htmllint';
import {
  CodeMirrorField,
} from '../../Editor/Components/Fields';
import {
  ClearSubmitButtons,
} from '../../Editor/Components/Forms';
import styles from './WYSIWYG.css';

class WYSIWYG extends PureComponent {
  static propTypes = {
    entryPoints: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    asyncValidating: PropTypes.bool.isRequired,
    asyncValidate: PropTypes.func.isRequired,
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
  asyncBlurFields: ['html'],
})(WYSIWYG);

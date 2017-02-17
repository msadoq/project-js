import React, { PureComponent, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { lint } from '../common/htmllint';
import {
  CodeMirrorField,
} from '../windowProcess/Editor/Components/Fields';
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
    closeHtmlEditor: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.resetAndClose = this.resetAndClose.bind(this);
    this.saveAndClose = this.saveAndClose.bind(this);
  }
  onChange = editorState => this.setState({ editorState });
  resetAndClose() {
    this.props.reset();
    this.props.closeHtmlEditor();
  }
  saveAndClose() {
    this.props.handleSubmit();
    this.props.closeHtmlEditor();
  }
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
          <div className={styles.footer}>
            <ButtonGroup>
              <Button
                type="button"
                disabled={pristine || submitting}
                onClick={this.resetAndClose}
                className={styles.footerButton}
              >
                Cancel
              </Button>
              <Button
                bsStyle="warning"
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
                className={styles.footerButton}
              >
                Reset
              </Button>
              <Button
                bsStyle="success"
                type="button"
                disabled={asyncValidating || pristine || submitting || !valid}
                className={styles.footerButton}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                bsStyle="success"
                type="button"
                disabled={asyncValidating || pristine || submitting || !valid}
                className={styles.footerButton}
                onClick={this.saveAndClose}
              >
                Save & Close
              </Button>
            </ButtonGroup>
          </div>
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

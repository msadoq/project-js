import React, { PureComponent, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { ButtonGroup, Button } from 'react-bootstrap';
import { lint } from '../common/htmllint';
import { CodeMirrorField } from '../windowProcess/commonReduxForm/';
import styles from './Source.css';

class SourceForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    closeHtmlEditor: PropTypes.func.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.string),
  }
  static defaultProps = {
    entryPoints: [],
  }

  onChange = editorState => this.setState({ editorState });
  resetAndClose = () => {
    this.props.reset();
    this.props.closeHtmlEditor();
  }
  saveAndClose = () => {
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
    } = this.props;

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="html"
          className={styles.CodeMirrorField}
          component={CodeMirrorField}
          autocompleteList={entryPoints}
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
              type="submit"
              disabled={pristine || submitting || !valid}
              className={styles.footerButton}
            >
              Save
            </Button>
            <Button
              bsStyle="success"
              type="button"
              disabled={pristine || submitting || !valid}
              className={styles.footerButton}
              onClick={this.saveAndClose}
            >
              Save & Close
            </Button>
          </ButtonGroup>
        </div>
      </form>
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
})(SourceForm);

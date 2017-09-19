import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { ButtonGroup, Button } from 'react-bootstrap';
import { lint } from '../common/htmllint';
import CodeMirrorField from '../windowProcess/commonReduxForm/CodeMirrorField';
import styles from './Source.css';

class HtmlSourceForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.string),
    viewType: PropTypes.string.isRequired,
  }
  static defaultProps = {
    entryPoints: [],
  }

  onChange = editorState => this.setState({ editorState });

  resetAndClose = () => {
    this.props.reset();
    this.props.closeCodeEditor();
  }
  saveAndClose = () => {
    this.props.handleSubmit();
    this.props.closeCodeEditor();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      entryPoints,
      viewType,
    } = this.props;

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div
          className={styles.hintDiv}
        >
          { viewType === 'TextView' && <h3>TextView HTML Editor</h3> }
          { viewType === 'MimicView' && <h3>MimicView SVG Editor</h3> }
        </div>
        <Field
          name="html"
          className={styles.CodeMirrorField}
          component={CodeMirrorField}
          autocompleteList={entryPoints}
          type="test"
        />
        { viewType === 'MimicView_' &&
          <div>
            <h4>Add predefined component</h4>
            <Button>Gauge</Button>
            <Button>Slider</Button>
            <Button>Knob</Button>
            <Button>TextBox</Button>
            <Button>Digital display</Button>
          </div>
        }
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
const validate = (values = {}, props) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  const htmlErrors = props.viewType === 'MimicView' ?
    lint(values.html, { 'spec-char-escape': false }) :
    lint(values.html);

  if (htmlErrors.length) {
    errors.html = `You have ${htmlErrors.length} errors`;
  }

  return errors;
};

export default reduxForm({
  validate,
  enableReinitialize: false,
})(HtmlSourceForm);

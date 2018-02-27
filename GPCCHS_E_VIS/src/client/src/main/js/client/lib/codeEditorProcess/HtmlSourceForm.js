// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6816 : 30/08/2017 : nodes processed by MimicView are not systematically transformed into <g>, node.name are preserved (except for textBox animation).
// VERSION : 1.1.2 : FA : #7753 : 18/09/2017 : Fixed Save & close issue with svg and html code editor.
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : Upgraded react-codemirror to 1.0.0, problem cursor going up should not occur anymore.
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : Resolved millenary problem with text and values interpolation in TextView code editor.
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { lint } from '../common/htmllint';
import CodeMirrorField from '../windowProcess/commonReduxForm/CodeMirrorField';
import styles from './Source.css';
import EditorButtonsBar from './EditorButtonsBar';

class HtmlSourceForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.object),
    viewType: PropTypes.string.isRequired,
  }
  static defaultProps = {
    entryPoints: [],
  };

  onChange = editorState => this.setState({ editorState });

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      entryPoints,
      viewType,
      closeCodeEditor,
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
          autocompleteList={entryPoints.map(ep => ep.name)}
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
        <EditorButtonsBar
          pristine={pristine}
          submitting={submitting}
          valid={valid}
          reset={reset}
          closeCodeEditor={closeCodeEditor}
          handleSubmit={handleSubmit}
        />
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

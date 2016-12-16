import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form
} from 'react-bootstrap';
import {
  CodeMirrorField
} from '../../../lib/windowProcess/Editor/Components/Fields';
import {
  ClearSubmitButtons
} from '../../../lib/windowProcess/Editor/Components/Forms/';
// import { sendToMain } from '../../../lib/ipc/window';
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
  }

  // componentWillMount() {
  //   sendToMain('htmlLint', {
  //     html: this.props.initialValues.html,
  //     // html: '<div>test</div>',
  //     options: {
  //       'attr-bans': ['src', 'dynsrc', 'lowsrc', 'onclick'],
  //       'attr-no-dup': true,
  //       'attr-no-unsafe-char': true,
  //       'attr-quote-style': 'quoted',
  //       'doctype-first': false,
  //       'id-class-style': false,
  //       'indent-style': 'spaces',
  //       'indent-width': 0,
  //       'tag-bans': [],
  //       'tag-name-lowercase': true,
  //       'tag-name-match': true,
  //       'line-end-style': false
  //     }
  //   }, response => this.setState({ issues: response.issues }));
  // }

  onChange = editorState => this.setState({ editorState });

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      entryPoints
    } = this.props;

    return (
      <div className={styles.root}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Field
            name="html"
            className={styles.CodeMirrorField}
            component={CodeMirrorField}
            autocompleteList={entryPoints}
            type="test"
          />

          <ClearSubmitButtons
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


// const asyncValidate = values => new Promise((resolve, reject) => {
//   console.log('asyncValidate');
//   sendToMain('htmlLint', {
//     html: values.html,
//     options: {
//       // 'attr-bans': ['src', 'dynsrc', 'lowsrc', 'onclick'],
//       // 'attr-no-dup': true,
//       // 'attr-no-unsafe-char': true,
//       // 'attr-quote-style': 'quoted',
//       'doctype-first': false,
//       // 'id-class-style': false,
//       // 'indent-style': 'spaces',
//       // 'indent-width': 0,
//       // 'tag-bans': [],
//       // 'tag-name-lowercase': true,
//       // 'tag-name-match': true,
//       'line-end-style': false
//     }
//   }, (response) => {
//     if (response.issues && response.issues.length > 0) {
//       /* eslint no-throw-literal: 0 */
//       reject({ html: response.issues });
//     } else {
//       resolve();
//     }
//   });
// });


export default reduxForm({
  // asyncValidate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(WYSIWYG);

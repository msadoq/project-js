// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fix deplacement automatique du curseur d edition
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Fix or comment some coding standard warnings
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : Upgraded react-codemirror to 1.0.0, problem cursor going up should not occur anymore.
// END-HISTORY
// ====================================================================

/* eslint import/no-webpack-loader-syntax:0 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import CodeMirrorStatic from 'codemirror';
import '!style!css!codemirror/theme/material.css';
import '!style!css!codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/mode/htmlmixed/htmlmixed';
import _debounce from 'lodash/debounce';
import '!style!css!codemirror/lib/codemirror.css';
import '!style!css!codemirror/addon/lint/lint.css';
import '!style!css!codemirror/addon/hint/show-hint.css';
import { Alert } from 'react-bootstrap';
// import { lint } from 'common/htmllint';
import handleContextMenu from '../common/handleContextMenu';
import styles from './CodeMirrorField.css';

export default class CodeMirrorField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
    autocompleteList: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      asyncValidating: PropTypes.bool,
      autofilled: PropTypes.bool,
      dirty: PropTypes.bool,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitFailed: PropTypes.bool,
      submitting: PropTypes.bool,
      touched: PropTypes.bool,
      visited: PropTypes.bool,
      valid: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
    options: PropTypes.shape({}),
    collection: PropTypes.arrayOf(PropTypes.shape),
  };

  static defaultProps = {
    className: '',
    autocompleteList: [],
    options: {},
    collection: [],
  };

  componentWillReceiveProps(nextProps) {
    // Bug on first render of codemirror, textarea is empty because props.input.value
    // is empty on first render
    if (this.codeMirrorInstance) {
      if (this.props.input.value === '' && nextProps.input.value.length) {
        this.codeMirrorInstance.doc.setValue(nextProps.input.value);
      }
      if (nextProps.meta.error && nextProps.meta.error.length) {
        this.codeMirrorInstance.setOption('lint', true);
      } else {
        this.codeMirrorInstance.setOption('lint', false);
      }
    }
  }

  onContextMenuClick = (e) => {
    const doc = this.codeMirrorInstance.getDoc();
    const cursor = doc.getCursor();
    const line = doc.getLine(cursor.line);
    const pos = {
      line: cursor.line,
      ch: line.length - 1,
    };
    doc.replaceRange(`\n${e.code}\n`, pos);
  };

  onContextMenu = () => {
    handleContextMenu(
      this.props.collection.map(col =>
        ({
          ...col,
          click: this.onContextMenuClick,
          submenu: col.submenu.map(sub => ({
            ...sub,
            click: this.onContextMenuClick,
          })),
        })
      )
    );
  };

  editorDidMount = (editor) => {
    this.codeMirrorInstance = editor;
    // CodeMirrorStatic.registerHelper('lint', 'html', (text) => {
    //   const found = [];
    //   const errors = lint(text);
    //   for (let i = 0; i < errors.length; i += 1) {
    //     const message = errors[i];
    //     const startLine = message.line - 1;
    //     const endLine = message.line - 1;
    //     const startCol = message.col - 1;
    //     const endCol = message.col;
    //     found.push({
    //       from: this.codeMirrorInstance.Pos(startLine, startCol),
    //       to: this.codeMirrorInstance.Pos(endLine, endCol),
    //       message: message.message,
    //       severity: message.type,
    //     });
    //   }
    //   return found;
    // });
    /*
      linting is disabled by default, and will be activated only if
      component receives error(s) from redux-form (componentWillReceiveProps)
    */
    this.codeMirrorInstance.setOption('lint', false);

    /*
    this.props.cmOptions.forEach((event) => {
      console.log(event);
      this.codeMirror.on(event.name, event.func);
    });
    */
    this.codeMirrorInstance.on('contextmenu', this.onContextMenu);

    // Fix display bug with CodeMirror
    setTimeout(() => this.forceUpdate());
  };
  codeMirrorInstance;

  autocomplete = (cm) => {
    const { autocompleteList } = this.props;
    CodeMirrorStatic.showHint(cm, cmd => ({
      from: cmd.getCursor(), to: cmd.getCursor(), list: autocompleteList,
    }));
  };

  handleOnChange = _debounce((editor, data, value) => {
    const { input: { onChange } } = this.props;
    onChange(value);
    // asyncValidate();
  }, 500);

  render() {
    const {
      input,
      options,
      className,
      meta: {
        error,
      },
    } = this.props;
    const codeMirrorOptions = {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'htmlmixed',
      gutters: ['CodeMirror-lint-markers'],
      extraKeys: {
        Tab: this.autocomplete,
      },
      lint: true,
      ...options,
    };

    return (
      <div
        className={classnames({
          'has-error': error,
        }, 'CodeMirrorField', className)}
      >
        <CodeMirror
          value={input.value}
          options={codeMirrorOptions}
          editorDidMount={this.editorDidMount}
          onChange={this.handleOnChange}
          className={styles['codemirror-container']}
        />
        {error && <Alert bsStyle="danger" className="m0">
          {error}
        </Alert>}
      </div>
    );
  }
}

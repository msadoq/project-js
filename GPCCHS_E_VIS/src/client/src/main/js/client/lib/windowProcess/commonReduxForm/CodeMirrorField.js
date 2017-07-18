/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import CodeMirror from 'react-codemirror';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/mode/htmlmixed/htmlmixed';
import _debounce from 'lodash/debounce';
import '!style!css!codemirror/lib/codemirror.css';
import '!style!css!codemirror/addon/lint/lint.css';
import '!style!css!codemirror/addon/hint/show-hint.css';
import {
  Alert,
} from 'react-bootstrap';
import handleContextMenu from '../common/handleContextMenu';
import { lint } from '../../../lib/common/htmllint';
import './CodeMirrorField.css';

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
    collection: PropTypes.arrayOf({}),
  }

  static defaultProps = {
    className: '',
    autocompleteList: [],
    options: {},
    collection: [],
  }

  componentDidMount() {
    this.codeMirrorInstance = this.element.getCodeMirrorInstance();
    this.codeMirror = this.element.getCodeMirror();

    this.codeMirrorInstance.registerHelper('lint', 'html', (text) => {
      const found = [];
      const errors = lint(text);
      for (let i = 0; i < errors.length; i += 1) {
        const message = errors[i];
        const startLine = message.line - 1;
        const endLine = message.line - 1;
        const startCol = message.col - 1;
        const endCol = message.col;
        found.push({
          from: this.codeMirrorInstance.Pos(startLine, startCol),
          to: this.codeMirrorInstance.Pos(endLine, endCol),
          message: message.message,
          severity: message.type,
        });
      }
      return found;
    });
    /*
      linting is disabled by default, and will be activated only if
      component receives eror(s) from redux-form (componentWillReceiveProps)
    */
    this.codeMirror.setOption('lint', false);

    /*
    this.props.cmOptions.forEach((event) => {
      console.log(event);
      this.codeMirror.on(event.name, event.func);
    });
    */
    this.codeMirror.on('contextmenu', () => this.onContextMenu());

    // Fix display bug with CodeMirror
    setTimeout(() => this.forceUpdate());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta.error && nextProps.meta.error.length) {
      this.codeMirror.setOption('lint', true);
    } else {
      this.codeMirror.setOption('lint', false);
    }
  }

  onContextMenuClick = (e) => {
    const doc = this.codeMirror.getDoc();
    const cursor = doc.getCursor();
    const line = doc.getLine(cursor.line);
    const pos = {
      line: cursor.line,
      ch: line.lenght - 1,
    };
    doc.replaceRange(`\n${e.code}\n`, pos);
  }
  onContextMenu =() => {
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
  }
  element;
  codeMirrorInstance;
  codeMirror;

  autocomplete = (cm) => {
    const { autocompleteList } = this.props;
    const codeMirror = this.element.getCodeMirrorInstance();
    codeMirror.showHint(cm, cmd => ({
      from: cmd.getCursor(), to: cmd.getCursor(), list: autocompleteList,
    }));
  }

  handleOnChange = _debounce((value) => {
    const { input: { onChange } } = this.props;
    onChange(value);
    // asyncValidate();
  }, 500)

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
          ref={(el) => { this.element = el; }}
          {...input}
          options={codeMirrorOptions}
          onChange={this.handleOnChange}
        />
        {error && <Alert bsStyle="danger" className="m0">
          {error}
        </Alert>}
      </div>
    );
  }
}

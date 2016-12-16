/* eslint import/no-webpack-loader-syntax:0 */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import CodeMirror from 'react-codemirror';
// import 'codemirror/addon/lint/lint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/mode/htmlmixed/htmlmixed';
import _debounce from 'lodash/debounce';
import '!style!css!codemirror/lib/codemirror.css';
import '!style!css!codemirror/addon/lint/lint.css';
import '!style!css!codemirror/addon/hint/show-hint.css';

// import { HtmlLint } from './CodeMirror/htmlLint';
// import { Lint } from './CodeMirror/lint';
// import { ShowHint } from './CodeMirror/showHint';

export default class CodeMirrorField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    autocompleteList: PropTypes.array,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object,
    options: PropTypes.object
  }

  static defaultProps = {
    autocompleteList: []
  }

  // componentDidMount() {
  //   const CodeMirrorStatic = this.element.getCodeMirrorInstance();
  //   const instance = this.element.getCodeMirror();
  //   // ShowHint(CodeMirrorStatic);
  //   // Lint(CodeMirrorStatic);
  //   // HtmlLint(CodeMirrorStatic);
  //   // CodeMirrorStatic.hint.html = (cm) => {
  //   //   console.log('eee');
  //   //   // var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
  //   //   // inner.list.push("bozo");
  //   //   // return inner;
  //   //   return ;
  //   // };
  //   console.log('HtmlLint', CodeMirrorStatic.registerHelper,
  // instance.registerHelper, instance.getHelpers());
  //   // this.componentWillReceiveProps();
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps || nextProps.meta.error !== this.props.meta.error) {
  //     console.log('componentWillReceiveProps');
  //     const CodeMirrorStatic = this.element.getCodeMirrorInstance();
  //     const instance = this.element.getCodeMirror();
  //     CodeMirrorStatic.registerHelper('lint', 'html', (/* text, options */) => {
  //       console.log('registerHelper');
  //       const found = [];
  //       if (!this.props.meta.error || !this.props.meta.error.length) return found;
  //       for (let i = 0; i < this.props.meta.error.length; i += 1) {
  //         const message = this.props.meta.error[i];
  //         const startLine = message.line - 1;
  //         const endLine = message.line - 1;
  //         const startCol = message.column - 1;
  //         const endCol = message.column;

  //         found.push({
  //           from: instance.Pos(startLine, startCol),
  //           to: instance.Pos(endLine, endCol),
  //           message: message.rule,
  //           severity: 'error'
  //         });
  //       }
  //       return found;
  //     });
  //   }
  // }

  element;

  autocomplete = (cm) => {
    const { autocompleteList } = this.props;
    const codeMirror = this.element.getCodeMirrorInstance();
    codeMirror.showHint(cm, cmd => ({
      from: cmd.getCursor(), to: cmd.getCursor(), list: autocompleteList
    }));
  }

  render() {
    const {
      input,
      options,
      className,
      meta: {
        touched,
        error,
        warning
      }
    } = this.props;

    const codeMirrorOptions = {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'htmlmixed',
      extraKeys: {
        Tab: this.autocomplete
      },
      ...options
    };

    return (
      <div
        className={classnames({
          'has-error': touched && error,
          'has-warning': touched && warning,
          'has-success': touched && !(error || warning),
        }, 'CodeMirrorField', className)}
      >
        <CodeMirror
          ref={(el) => { this.element = el; }}
          {...input}
          options={codeMirrorOptions}
          onChange={_debounce(value => input.onChange(value), 500)}
        />
      </div>
    );
  }
}

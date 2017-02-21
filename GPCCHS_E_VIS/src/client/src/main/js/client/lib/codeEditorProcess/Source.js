import React, { PureComponent, PropTypes } from 'react';
import { html as beautifyHtml } from 'js-beautify';
import SourceForm from './SourceForm';

export default class Source extends PureComponent {
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    closeHtmlEditor: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.string),
  }
  static defaultProps = {
    entryPoints: {},
  }

  willSubmit = (values) => {
    const { viewId, updateContent } = this.props;
    updateContent(viewId, values);
  }

  render() {
    const {
      viewId,
      content,
      entryPoints,
      closeHtmlEditor,
    } = this.props;
    const initialValues = { html: beautifyHtml(content, { indent_size: 2 }) };
    return (
      <SourceForm
        entryPoints={entryPoints}
        closeHtmlEditor={closeHtmlEditor}
        onSubmit={this.willSubmit}
        form={`textView-form-${viewId}`}
        initialValues={initialValues}
      />
    );
  }
}

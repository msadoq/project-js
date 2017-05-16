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
    type: PropTypes.string.isRequired,
  }
  static defaultProps = {
    entryPoints: [],
  }

  updateContent = (values) => {
    this.props.updateContent(this.props.viewId, values);
  }

  render() {
    const {
      viewId,
      content,
      entryPoints,
      closeHtmlEditor,
      type,
    } = this.props;
    const initialValues = { html: beautifyHtml(content, { indent_size: 2 }) };

    return (
      <SourceForm
        key={viewId}
        entryPoints={entryPoints}
        closeHtmlEditor={closeHtmlEditor}
        onSubmit={this.updateContent}
        form={`textView-form-${viewId}`}
        initialValues={initialValues}
        viewType={type}
      />
    );
  }
}

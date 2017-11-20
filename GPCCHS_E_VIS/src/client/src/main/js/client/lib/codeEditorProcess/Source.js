import React, { PureComponent, PropTypes } from 'react';
import { html as beautifyHtml } from 'js-beautify';
import HtmlSourceForm from './HtmlSourceForm';
import SvgSourceForm from './SvgSourceForm';

export default class Source extends PureComponent {
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    closeCodeEditor: PropTypes.func.isRequired,
    viewId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string.isRequired,
  };
  static defaultProps = {
    entryPoints: [],
    entryPointsName: [],
  };
  updateContent = (values) => {
    this.props.updateContent(this.props.viewId, values);
  };
  render() {
    const {
      viewId,
      content,
      entryPoints,
      closeCodeEditor,
      type,
    } = this.props;
    const initialValues = { html: beautifyHtml(content, { indent_size: 2 }) };
    return (
      <div>
        {
          type === 'TextView' &&
            <HtmlSourceForm
              key={viewId}
              entryPoints={entryPoints}
              closeCodeEditor={closeCodeEditor}
              onSubmit={this.updateContent}
              form={`textView-form-${viewId}`}
              initialValues={initialValues}
              viewType={type}
            />
        }
        {
          type === 'MimicView' &&
            <SvgSourceForm
              key={viewId}
              entryPoints={entryPoints}
              closeCodeEditor={closeCodeEditor}
              onSubmit={this.updateContent}
              form={`mimicView-form-${viewId}`}
              initialValues={initialValues}
              viewType={type}
            />
        }
      </div>
    );
  }
}

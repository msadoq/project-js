import React, { PropTypes, PureComponent } from 'react';
import { html as beautifyHtml } from 'js-beautify';
import WYSIWYG from './WYSIWYG';

export default class HtmlEditor extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string,
    content: PropTypes.string,
    updateContent: PropTypes.func.isRequired,
    closeHtmlEditor: PropTypes.func.isRequired,
    data: PropTypes.shape({
      values: PropTypes.object,
    }).isRequired,
    entryPoints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      connectedData: PropTypes.shape({
        digit: PropTypes.number,
        domain: PropTypes.string,
        format: PropTypes.string,
        formula: PropTypes.string,
        timeline: PropTypes.string,
        unit: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
      }),
    })),
  }

  static defaultProps = {
    viewId: null,
    content: undefined,
    entryPoints: {},
  }
  handleSubmit = (values) => {
    console.log(values);
    const { viewId, updateContent } = this.props;
    updateContent(viewId, values.html);
  }

  render() {
    if (this.props.viewId === null) {
      return (
        <div>
          <span>Chargement ... </span>
        </div>
      );
    }
    const template = { html: beautifyHtml(this.props.content, { indent_size: 2 }) };
    return (
      <WYSIWYG
        initialValues={template}
        entryPoints={this.props.entryPoints.map(ep => ep.name)}
        onSubmit={this.handleSubmit}
        form={`textView-form-${this.props.viewId}`}
        closeHtmlEditor={this.props.closeHtmlEditor}
      />
    );
  }
}

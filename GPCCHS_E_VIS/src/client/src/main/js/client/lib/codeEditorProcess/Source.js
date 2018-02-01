// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Improve and debug code editor
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Add getentrypointsname in view selector
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : debug change TextView in code editor
// VERSION : 1.1.2 : DM : #6129 : 03/05/2017 : first functionnal mimic with animations
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : FA : #7185 : 05/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : FA : #7753 : 18/09/2017 : Fixed Save & close issue with svg and html code editor.
// VERSION : 1.1.2 : FA : #7753 : 19/09/2017 : Upgraded react-codemirror to 1.0.0, problem cursor going up should not occur anymore.
// END-HISTORY
// ====================================================================

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

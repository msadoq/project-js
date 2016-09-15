import React, { Component, PropTypes } from 'react';
import PlotEditor from './Components/PlotEditor';
import TextEditor from './Components/TextEditor';

export default class Editor extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    editor: PropTypes.object,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
  };
  render() {
    switch (this.props.editor.configuration.type) {
      case 'PlotView' : return (<PlotEditor
        configuration={this.props.editor.configuration}
        closeEditor={this.props.closeEditor}
      />);
      case 'TextView' : return (<TextEditor
        configuration={this.props.editor.configuration}
        closeEditor={this.props.closeEditor}
      />);
      default : return (<PlotEditor
        configuration={this.props.editor.configuration}
        closeEditor={this.props.closeEditor}
      />);
    }
  }
}

import React, { Component, PropTypes } from 'react';
import PlotEditor from './Editor/PlotEditor';
import TextEditor from './Editor/TextEditor';

export default class Editor extends Component {
  static propTypes = {
    closeEditor: PropTypes.func.isRequired,
    configuration: PropTypes.any,
  }
  render() {
    switch (this.props.configuration.type) {
      case 'PlotView' : return (<PlotEditor
        configuration={this.props.configuration}
        closeEditor={this.props.closeEditor}
      />);
      case 'TextView' : return (<TextEditor
        configuration={this.props.configuration}
        closeEditor={this.props.closeEditor}
      />);
      default : return (<PlotEditor
        configuration={this.props.configuration}
        closeEditor={this.props.closeEditor}
      />);
    }
  }
}

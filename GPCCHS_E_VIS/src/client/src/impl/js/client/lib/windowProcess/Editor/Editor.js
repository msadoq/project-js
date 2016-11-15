import React, { Component, PropTypes } from 'react';
import { PlotEditorContainer } from './Components/Plot';
import TextEditorContainer from './Components/TextEditorContainer';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Editor');

const InvalidConfiguration = () => <div> unknown view type or invalid configuration: </div>;
// TODO dedicated component

export default class Editor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    configuration: PropTypes.object,
    closeEditor: PropTypes.func,
  };
  render() {
    logger.debug('render');
    const { configuration } = this.props;

    if (!configuration) {
      return <InvalidConfiguration />;
    }

    switch (configuration.type) { // TODO dynamic type
      case 'PlotView' :
        return <PlotEditorContainer {...this.props} />;
      case 'TextView' :
        return <TextEditorContainer {...this.props} />;
      default :
        return <InvalidConfiguration />;
    }
  }
}

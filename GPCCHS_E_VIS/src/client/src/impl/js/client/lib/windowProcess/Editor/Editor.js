import React, { Component, PropTypes } from 'react';
import { PlotEditorContainer } from './Components/Plot';
import { TextEditorContainer } from './Components/Text';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Editor');

const InvalidConfiguration = () => <div> unknown view type or invalid configuration: </div>;
// TODO dedicated component

export default class Editor extends Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    configuration: PropTypes.object,
    closeEditor: PropTypes.func
  };

  static childContextTypes = {
    viewId: React.PropTypes.string
  }

  getChildContext() {
    return {
      viewId: this.props.viewId
    };
  }

  render() {
    logger.debug('render');
    const {
      configuration,
      viewType,
      viewId,
      closeEditor
    } = this.props;

    if (!configuration) {
      return <InvalidConfiguration />;
    }

    switch (configuration.type) { // TODO dynamic type
      case 'PlotView' :
        return (
          <PlotEditorContainer
            key={viewId}
            viewId={viewId}
            viewType={viewType}
            configuration={configuration}
            closeEditor={closeEditor}
          />
        );
      case 'TextView' :
        return (
          <TextEditorContainer
            key={viewId}
            viewId={viewId}
            viewType={viewType}
            configuration={configuration}
            closeEditor={closeEditor}
          />
        );
      default :
        return <InvalidConfiguration />;
    }
  }
}

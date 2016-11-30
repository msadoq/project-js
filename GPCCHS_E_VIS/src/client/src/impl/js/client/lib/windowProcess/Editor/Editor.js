import React, { Component, PropTypes } from 'react';
import getLogger from 'common/log';
import { PlotEditorContainer } from './Components/Plot';
import { TextEditorContainer } from './Components/Text';
import styles from './Editor.css';

const logger = getLogger('GPCCHS:Editor');

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
      configuration: { type },
      viewType,
      viewId,
      closeEditor
    } = this.props;

    if (!configuration || !configuration.type) {
      return <InvalidConfiguration />;
    }

    return (
      <div
        className={styles.root}
      >
        <div className={styles.editor}>
          {type === 'PlotView' && <PlotEditorContainer
            key={viewId}
            viewId={viewId}
            viewType={viewType}
            configuration={configuration}
            closeEditor={closeEditor}
          />}
          {type === 'TextView' && <TextEditorContainer
            key={viewId}
            viewId={viewId}
            viewType={viewType}
            configuration={configuration}
            closeEditor={closeEditor}
          />}
        </div>
      </div>
    );
  }
}

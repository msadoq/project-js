import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from 'common/log';
import PlotEditorContainer from '../../viewManager/PlotView/Components/Editor/PlotEditorContainer';
import TextEditorContainer from '../../viewManager/TextView/Components/Editor/TextEditorContainer';
import DynamicEditorContainer from '../../viewManager/DynamicView/Components/Editor/DynamicEditorContainer';
import styles from './Editor.css';

const logger = getLogger('Editor');

const InvalidConfiguration = () => <div> unknown view type or invalid configuration: </div>;
// TODO dedicated component

export default class Editor extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    viewType: PropTypes.string.isRequired,
    configuration: PropTypes.shape({}),
    closeEditor: PropTypes.func,
  };

  static childContextTypes = {
    viewId: React.PropTypes.string,
  }

  getChildContext() {
    return {
      viewId: this.props.viewId,
    };
  }

  render() {
    logger.debug('render');
    const {
      configuration,
      configuration: { type },
      viewType,
      viewId,
      closeEditor,
      focusedPageId,
    } = this.props;

    if (!configuration || !configuration.type) {
      return <InvalidConfiguration />;
    }

    return (
      <div
        className={styles.root}
      >
        <div className={classnames('subdiv', styles.editor)}>
          {type === 'PlotView' && <PlotEditorContainer
            key={viewId}
            viewId={viewId}
            focusedPageId={focusedPageId}
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
          {type === 'DynamicView' && <DynamicEditorContainer
            key={viewId}
            viewId={viewId}
            focusedPageId={focusedPageId}
            viewType={viewType}
            configuration={configuration}
            closeEditor={closeEditor}
          />}
        </div>
      </div>
    );
  }
}

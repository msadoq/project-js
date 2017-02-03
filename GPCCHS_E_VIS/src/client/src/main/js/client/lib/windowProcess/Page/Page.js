import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from 'common/log';
import { get } from 'common/parameters';
import _ from 'lodash/fp';
import path from 'path';

import ContentContainer from './ContentContainer';
import EditorContainer from '../Editor/EditorContainer';
import styles from './Page.css';
import MessagesContainer from './MessagesContainer';
import DroppableContainer from '../common/DroppableContainer';
import { main } from '../ipc';

const logger = getLogger('Page');

// const cols = 12;
// const editorCols = 4;

const getDropItemType = _.cond([
  [m => /ViewDoc$/i.test(m), () => 'view'],
  [m => /PageDoc$/i.test(m), () => 'page'],
  [m => /WorkspaceDoc$/i.test(m), () => 'workspace'],
  [_.stubTrue, _.identity],
]);

export default class Page extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    editorViewId: PropTypes.string,
    focusedPageId: PropTypes.string,
  };

  static childContextTypes = {
    focusedPageId: React.PropTypes.string
  }

  getChildContext() {
    return {
      focusedPageId: this.props.focusedPageId
    };
  }

  componentWillReceiveProps(nextProps) {
    // Easier way to resize the responsive grid
    // https://github.com/STRML/react-grid-layout/issues/81
    if (this.props.isEditorOpened !== nextProps.isEditorOpened) {
      setTimeout(() => window.dispatchEvent(new Event('resize')));
    }
  }

  onDrop(e) { // eslint-disable-line class-methods-use-this
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    const type = getDropItemType(content.mimeType);

    _.cond([
      [_.eq('view'), () => main.openView({
        windowId: this.props.windowId,
        viewPath: [{ absolutePath: path.join(get('FMD_ROOT_DIR'), content.filepath) }],
      })],
      [_.eq('page'), () => main.openPage({
        windowId: this.props.windowId,
        filePath: path.join(get('FMD_ROOT_DIR'), content.filepath),
      })],
      [_.eq('workspace'), () => main.openWorkspace({
        filePath: path.join(get('FMD_ROOT_DIR'), content.filepath),
      })]
    ])(type);
  }

  onDrop = ::this.onDrop;

  render() {
    logger.debug('render');
    const {
      focusedPageId, windowId, editorViewId,
      openEditor, closeEditor, isEditorOpened
    } = this.props;
    const droppableContainerStyle = {
      height: '100%',
      position: 'relative',
    };
    return (
      <div className={styles.root}>
        {isEditorOpened && <EditorContainer
          focusedPageId={focusedPageId}
        />}
        <div
          className={classnames({
            [styles.contentWithEditor]: isEditorOpened
          })}
        >
          <MessagesContainer pageId={focusedPageId} />
          <DroppableContainer
            style={droppableContainerStyle}
            onDrop={this.onDrop}
          >
            <ContentContainer
              windowId={windowId}
              focusedPageId={focusedPageId}
              editorViewId={editorViewId}
              isEditorOpened={isEditorOpened}
              openEditor={openEditor}
              closeEditor={closeEditor}
            />
          </DroppableContainer>
        </div>
      </div>
    );
  }
}

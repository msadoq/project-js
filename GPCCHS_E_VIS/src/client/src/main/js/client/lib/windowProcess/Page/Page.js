import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from 'common/log';
import { get } from 'common/parameters';
import __ from 'lodash/fp';
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

const getDropItemType = __.cond([
  [m => /ViewDoc$/i.test(m), () => 'view'],
  [m => /PageDoc$/i.test(m), () => 'page'],
  [m => /WorkspaceDoc$/i.test(m), () => 'workspace'],
  [__.stubTrue, __.identity],
]);

const droppableContainerStyle = {
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export default class Page extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    isEditorOpened: PropTypes.bool.isRequired,
    openEditor: PropTypes.func.isRequired,
    closeEditor: PropTypes.func.isRequired,
    editorViewId: PropTypes.string,
    focusedPageId: PropTypes.string,
  };

  static defaultProps = {
    editorViewId: null,
    focusedPageId: null,
  };

  static childContextTypes = {
    focusedPageId: React.PropTypes.string,
  }

  getChildContext() {
    return {
      focusedPageId: this.props.focusedPageId,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      // used to avoid 0 height when first mouting plotView
      // problem due to react-dimensions non knowing initial height
      // HOTFIX
      window.dispatchEvent(new Event('resize'));
    }, 40);
  }

  componentWillReceiveProps(nextProps) {
    // Easier way to resize the responsive grid
    // https://github.com/STRML/react-grid-layout/issues/81
    if (this.props.isEditorOpened !== nextProps.isEditorOpened) {
      setTimeout(() => window.dispatchEvent(new Event('resize')));
    }
  }

  onDrop = (e) => { // eslint-disable-line class-methods-use-this
    const data = e.dataTransfer.getData('text/plain');
    const content = JSON.parse(data);

    const type = getDropItemType(content.mimeType);

    __.cond([
      [__.eq('view'), () => main.openView({
        windowId: this.props.windowId,
        viewPath: [{ absolutePath: path.join(
          get('FMD_ROOT_DIR'),
          __.getOr(__.get('filepath', content), 'filePath', content)
        ) }],
      })],
      [__.eq('page'), () => main.openPage({
        windowId: this.props.windowId,
        filePath: path.join(
          get('FMD_ROOT_DIR'),
          __.getOr(__.get('filepath', content), 'filePath', content)
        ),
      })],
      [__.eq('workspace'), () => main.openWorkspace({
        filePath: path.join(
          get('FMD_ROOT_DIR'),
          __.getOr(__.get('filepath', content), 'filePath', content)
        ),
      })],
    ])(type);
  }

  render() {
    logger.debug('render');
    const {
      focusedPageId, windowId, editorViewId,
      openEditor, closeEditor, isEditorOpened,
    } = this.props;

    return (
      <div className={styles.root}>
        {isEditorOpened && <EditorContainer
          focusedPageId={focusedPageId}
        />}
        <div
          className={classnames({
            [styles.contentWithEditor]: isEditorOpened,
          }, styles.content)}
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

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import getLogger from 'common/log';
import ContentContainer from './ContentContainer';
import EditorContainer from '../Editor/EditorContainer';
import styles from './Page.css';

const logger = getLogger('GPCCHS:Page');

// const cols = 12;
// const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    editorViewId: PropTypes.string,
    focusedPageId: PropTypes.string.isRequired,
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

  render() {
    logger.debug('render');
    const {
      focusedPageId, windowId, editorViewId,
      openEditor, closeEditor, isEditorOpened
    } = this.props;

    // const pageContentWidth = isEditorOpened ? cols - editorCols : cols;

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
          <ContentContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
            editorViewId={editorViewId}
            isEditorOpened={isEditorOpened}
            openEditor={openEditor}
            closeEditor={closeEditor}
          />
        </div>
      </div>
    );
  }
}

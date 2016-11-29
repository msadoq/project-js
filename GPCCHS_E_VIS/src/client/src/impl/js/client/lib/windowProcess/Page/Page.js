import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import classnames from 'classnames';
import ContentContainer from './ContentContainer';
import EditorContainer from '../Editor/EditorContainer';
import debug from '../../../lib/common/debug/windowDebug';
import styles from './Page.css';

const logger = debug('Page');

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
    editorViewId: PropTypes.string,
    focusedPageId: PropTypes.string.isRequired
  };

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

    const pageContentWidth = isEditorOpened ? cols - editorCols : cols;

    return (
      <div className={classnames('row', styles.root)}>
        {(isEditorOpened
          ? <Col
            xs={editorCols}
            className={styles.editor}
          >
            <EditorContainer
              editorCols={editorCols}
              focusedPageId={focusedPageId}
            />
          </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <ContentContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
            editorViewId={editorViewId}
            isEditorOpened={isEditorOpened}
            openEditor={openEditor}
            closeEditor={closeEditor}
          />
        </Col>
      </div>
    );
  }
}

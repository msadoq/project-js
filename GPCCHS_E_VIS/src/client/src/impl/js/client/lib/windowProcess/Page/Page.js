import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ContentContainer from './ContentContainer';
import EditorContainer from '../Editor/EditorContainer';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Page');

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    focusedPageId: PropTypes.string.isRequired
  };
  render() {
    logger.debug('render');
    const {
      focusedPageId, windowId,
      openEditor, isEditorOpened
    } = this.props;

    const pageContentWidth = isEditorOpened ? cols - editorCols : cols;

    return (
      <div>
        {(isEditorOpened
          ? <Col xs={editorCols}>
            <EditorContainer
              focusedPageId={focusedPageId}
            />
          </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <ContentContainer
            isEditorOpened={isEditorOpened}
            windowId={windowId}
            focusedPageId={focusedPageId}
            openEditor={openEditor}
          />
        </Col>
      </div>
    );
  }
}

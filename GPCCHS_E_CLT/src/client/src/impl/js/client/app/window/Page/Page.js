import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import PageContentContainer from './PageContentContainer';
import EditorContainer from '../Editor/EditorContainer';

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    editor: PropTypes.object,
    isEditorOpened: PropTypes.bool,
    openEditor: PropTypes.func,
    closeEditor: PropTypes.func,
  };
  render() {
    const pageContentWidth = this.props.isEditorOpened ? cols - editorCols : cols;

    return (
      <div>
        {(this.props.isEditorOpened
          ? <Col xs={editorCols}>
            <EditorContainer
              closeEditor={this.props.closeEditor}
              viewId={this.props.editor.viewId}
              viewType={this.props.editor.viewType}
              configuration={this.props.editor.configuration}
            />
          </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <PageContentContainer
            pageId={this.props.pageId}
            openEditor={this.props.openEditor}
            closeEditor={this.props.closeEditor}
            viewOpenedInEditor={this.props.editor.viewId}
            isEditorOpened={this.props.isEditorOpened}
          />
        </Col>
      </div>
    );
  }
}

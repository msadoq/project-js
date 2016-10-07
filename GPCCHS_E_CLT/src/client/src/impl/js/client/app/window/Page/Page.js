import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import PageContentContainer from './PageContentContainer';
// import EditorContainer from '../Editor/EditorContainer';

const cols = 12;
const editorCols = 4;

export default class Page extends Component {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
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
            this is editor
            {/*<EditorContainer closeEditor={this.props.closeEditor} {...this.props.editor} />*/}
          </Col>
          : '')}
        <Col xs={pageContentWidth}>
          <PageContentContainer {...this.props} />
        </Col>
      </div>
    );
  }
}
